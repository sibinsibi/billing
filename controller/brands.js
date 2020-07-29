var app = angular.module('brands', ['ngCookies', 'datatables']);
app.controller('brandCtrl', function($scope, $http, $cookies, $route) {

    !$cookies.get("username") ? window.location.href = "index.html" : '';

    let lastBrandId = ''
    $scope.allBrands = [];
    $http.get('./server/brand/getAllBrand.php').then((res) => {
        if(res.data.records.length){
            $scope.allBrands = res.data.records
             let lastBrand =  $scope.allBrands[$scope.allBrands.length - 1].brand_id;
             lastBrandId  = parseInt(lastBrand.match(/\d+/g)[0]);
             lastBrandId++
        }
    }).catch((error) => {
        console.log(error)
    });
    
    $scope.addBrand = () => {

        if(!$scope.newBrand){
            alert('Enter brand name')
            return
        }

        $scope.newBrand.trim();
        $scope.newBrand = $scope.newBrand.charAt(0).toUpperCase() + $scope.newBrand.slice(1);
        let formData, postData;
        if($scope.allBrands.length){

            let bId = 'BRD' + String(lastBrandId)
            formData = { brandId: bId, brandName: $scope.newBrand };
            postData = 'myData='+JSON.stringify(formData);

        }else{
            formData = { brandId: 'BRD1', brandName: $scope.newBrand };
            postData = 'myData='+JSON.stringify(formData);
        }

        $http({
            method : 'POST',
            url : './server/brand/addNewBrand.php',
            data: postData,
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then((res) => {
            if(res.data.flag){
                alert('Added Successfully');
                $route.reload();
            }
            else{
                alert('Failed, try again!!')
                $route.reload();

            }
        }).catch((error) => {
            alert('Something went wrong')
        });
       
    }

    $scope.deleteBrand = (id) => {
        if (confirm("Are you sure!")) {
            let formData = { brandId: id };
            let postData = 'myData='+JSON.stringify(formData);
            $http({
                method : 'POST',
                url : './server/brand/deleteBrand.php',
                data: postData,
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then((res) => {
                if(res.data.flag){
                    alert('Deleted Successfully');
                    $route.reload();
                }
                else{
                    alert('Failed, try again!!')
                    $route.reload();
    
                }
            }).catch((error) => {
                alert('Something went wrong')
            });
            
        } 
        
    }

    $scope.openModalUpdateBrand = (brand) => {
        $("#updateBrand").modal()
        $scope.updatedBrand = brand;
    }

    $scope.updateBrand = () => {
        $("#updateBrand").modal('hide')
        if (confirm("Are you sure!")) {
            $scope.updatedBrand.brand_name.trim();
            $scope.updatedBrand.brand_name = $scope.updatedBrand.brand_name.charAt(0).toUpperCase() + $scope.updatedBrand.brand_name.slice(1);
            let formData = { brandId:  $scope.updatedBrand.brand_id, brandName:  $scope.updatedBrand.brand_name };
            let postData = 'myData='+JSON.stringify(formData);
            $http({
                method : 'POST',
                url : './server/brand/updateBrand.php',
                data: postData,
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then((res) => {
                if(res.data.flag){
                    alert('Updated Successfully');
                    $route.reload();
                }
                else{
                    alert('Failed, try again!!')
                    $route.reload();
    
                }
            }).catch((error) => {
                alert('Something went wrong' + error)
            });
            
        } 
    }


})