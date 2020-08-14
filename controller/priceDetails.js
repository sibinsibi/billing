var app = angular.module('priceDetails', ['ngCookies', 'datatables']);
app.controller('priceDetailsCtrl', function($scope, $http, $cookies, $route) {

    !$cookies.get("username") ? window.location.href = "index.html" : '';

    $scope.allItems = [];
    $http.get('./server/price-details/getAllItemDetails.php').then((res) => {
        if(res.data.records.length){
            $scope.allItems = res.data.records
        }
    }).catch((error) => {
        console.log(error)
    });


    $scope.openModalUpdateItem = (item) => {
        $("#updateItem").modal();
        item.unit_price = parseInt(item.unit_price)
        item.purchase_rate = parseInt(item.purchase_rate)
        item.selling_price = parseInt(item.selling_price)
        item.discount = parseInt(item.discount)
        $scope.updatedItem = item;
    }

    $scope.updateItem = () => {
    
        $("#updateItem").modal('hide')
        if (confirm("Are you sure!")) {
            let formData = { 
                itemId:  $scope.updatedItem.item_id,
                unitPrice: parseInt($scope.updatedItem.unit_price),
                purchaseRate: parseInt($scope.updatedItem.purchase_rate),
                sellingPrice: parseInt($scope.updatedItem.selling_price),
                discount: parseInt($scope.updatedItem.discount)
             };
            let postData = 'myData='+JSON.stringify(formData);
            $http({
                method : 'POST',
                url : './server/price-details/updateItemPrice.php',
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