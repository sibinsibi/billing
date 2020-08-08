var app = angular.module('supplier', ['ngCookies', 'datatables']);
app.controller('supplierCtrl', function($scope, $http, $cookies, $route) {

    !$cookies.get("username") ? window.location.href = "index.html" : '';

    let lastsId = ''
    $scope.allSuppliers = [];
    $http.get('./server/supplier-customer/getAllSupplier.php').then((res) => {
        if(res.data.records.length){
            $scope.allSuppliers = res.data.records
             let lastSupplier =  $scope.allSuppliers[$scope.allSuppliers.length - 1].s_id;
             lastsId  = parseInt(lastSupplier.match(/\d+/g)[0]);
             lastsId++
        }
    }).catch((error) => {
        console.log(error)
    });
    
    $scope.addSupplier = () => {

        if(!$scope.sName || !$scope.mob || !$scope.gstNo){
            alert('Enter all data')
            return
        }

        $scope.sName.trim();
        $scope.sName = $scope.sName.charAt(0).toUpperCase() + $scope.sName.slice(1);
        let formData, postData;
        if($scope.allSuppliers.length){
            let sId = 'SPR' + String(lastsId)
            formData = { sId: sId, sName: $scope.sName,mob: $scope.mob, gstNo: $scope.gstNo };
            postData = 'myData='+JSON.stringify(formData);
        }else{
            formData = { sId: 'SPR1', sName: $scope.sName,mob: $scope.mob, gstNo: $scope.gstNo };
            postData = 'myData='+JSON.stringify(formData);
        }

        $http({
            method : 'POST',
            url : './server/supplier-customer/addNewSupplier.php',
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

    $scope.deleteSupplier = (id) => {
        if (confirm("Are you sure!")) {
            let formData = { sId: id };
            let postData = 'myData='+JSON.stringify(formData);
            $http({
                method : 'POST',
                url : './server/supplier-customer/deleteSupplier.php',
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
                $route.reload();
            });
            
        } 
        
    }

    $scope.openModalUpdateSupplier = (supplier) => {
        $("#updateSupplier").modal()
        $scope.updatedSupplier = supplier;
    }

    $scope.updateSupplier = () => {
        if(!$scope.updatedSupplier.s_name || !$scope.updatedSupplier.mob || !$scope.updatedSupplier.gst_no){
            alert('Enter all data')
            return
        }
        $("#updateSupplier").modal('hide')
        if (confirm("Are you sure!")) {
            $scope.updatedSupplier.s_name.trim();
            $scope.updatedSupplier.s_name = $scope.updatedSupplier.s_name.charAt(0).toUpperCase() + $scope.updatedSupplier.s_name.slice(1);
            let formData = { sId:  $scope.updatedSupplier.s_id, sName:  $scope.updatedSupplier.s_name, mob: $scope.updatedSupplier.mob, gstNo: $scope.updatedSupplier.gst_no };
            let postData = 'myData='+JSON.stringify(formData);
            $http({
                method : 'POST',
                url : './server/supplier-customer/updateSupplier.php',
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
                $route.reload();
            });
            
        } 
    }

    $("#updateSupplier").on('hidden.bs.modal', function(){
        $route.reload();
    });

})