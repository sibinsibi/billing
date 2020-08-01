var app = angular.module('items', ['ngCookies', 'datatables']);
app.controller('itemCtrl', function($scope, $http, $cookies, $route) {

    !$cookies.get("username") ? window.location.href = "index.html" : '';

    $scope.allItems = [];
    let lastItemId = ''
    $http.get('./server/item/getAllItem.php').then((res) => {
        if(res.data.records.length){
            $scope.allItems = res.data.records
             let lastItem =  $scope.allItems[$scope.allItems.length - 1].item_id;
             lastItemId  = parseInt(lastItem.match(/\d+/g)[0]);
             lastItemId++
        }
    }).catch((error) => {
        console.log(error)
    });

    $scope.allBrands = [];
    $http.get('./server/brand/getAllBrand.php').then((res) => {
        if(res.data.records.length){
            let allBrands = res.data.records;
            let  brands = []
            for(let i = 0; i < allBrands.length; i++){
                brands.push(allBrands[i].brand_name)
            }
            $scope.allBrands = brands;            
        }
    }).catch((error) => {
        console.log(error)
    });

    $scope.allUnits = [];
    $http.get('./server/unit/getAllUnit.php').then((res) => {
        if(res.data.records.length){
           let allUnits = res.data.records;
            let units = [];
            for(let i = 0; i < allUnits.length; i++){
                units.push(allUnits[i].unit_name);
            }
            $scope.allUnits = units;
        }
    }).catch((error) => {
        console.log(error)
    });

    $scope.getBrands = (id) => {
      $( "#"+id ).autocomplete({
        source: $scope.allBrands
      });
    } 
    $scope.getUnits = (id) => {
        $( "#"+id ).autocomplete({
          source: $scope.allUnits
        });
    } 

    $scope.addItem = () => {

        if(!$scope.newItem || !$scope.brand){
            alert('Enter all data')
            return
        }
        
        $scope.newItem.trim();
        $scope.newItem = $scope.newItem.charAt(0).toUpperCase() + $scope.newItem.slice(1);

        $scope.unit ? $scope.unit = $scope.unit : $scope.unit = null
        let formData = { 
            newItem: $scope.newItem,
            brand: $scope.brand,
            unit: $scope.unit,
        };

        if($scope.allItems.length){

            formData.itemId = 'ITM' + String(lastItemId)

        }else{
            formData.itemId = 'ITM1';
        }
        
        let postData = 'myData='+JSON.stringify(formData);
        

        $http({
            method : 'POST',
            url : './server/item/addNewItem.php',
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

    $scope.deleteItem = (id) => {
        if (confirm("Are you sure!")) {
            let formData = { itemId: id };
            let postData = 'myData='+JSON.stringify(formData);
            $http({
                method : 'POST',
                url : './server/item/deleteItem.php',
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

    $scope.openModalUpdateItem = (item) => {
        $("#updateItem").modal();
        const items = item
        $scope.$applyAsync(() =>{
            $scope.updatedItem = items;
        })
    }

    $scope.updateItem = () => {
        if(!$scope.updatedItem.item_name || !$scope.updatedItem.brand){
            alert('Enter all data')
            return
        }
        $("#updateItem").modal('hide')
        if (confirm("Are you sure!")) {
            $scope.updatedItem.item_name.trim();
            $scope.updatedItem.item_name = $scope.updatedItem.item_name.charAt(0).toUpperCase() + $scope.updatedItem.item_name.slice(1);
            let formData = { 
                itemId:  $scope.updatedItem.item_id,
                itemName:  $scope.updatedItem.item_name,
                brand:  $scope.updatedItem.brand,
                unit:  $scope.updatedItem.unit
             };
            let postData = 'myData='+JSON.stringify(formData);
            $http({
                method : 'POST',
                url : './server/item/updateItem.php',
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

    $("#updateItem").on('hidden.bs.modal', function(){
        $route.reload();
    });
    

})