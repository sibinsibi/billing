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

    $scope.allGst = []
    $http.get('./server/tax/getAllGst.php').then((res) => {
        if(res.data.records.length){
            $scope.allGst = res.data.records
        }
    }).catch((error) => {
        console.log(error)
    });

    $scope.openModalUpdateItem = (item) => {
        $("#updateItem").modal();
        item.unit_price = parseFloat(parseFloat(item.unit_price).toFixed(2));
        item.purchase_rate = parseFloat(parseFloat(item.purchase_rate).toFixed(2));
        item.selling_price = parseFloat(parseFloat(item.selling_price).toFixed(2));
        item.discount = parseFloat(parseFloat(item.discount).toFixed(2));
        item.gst = parseFloat(item.gst)
        $scope.updatedItem = item;
    }

    $scope.updateItem = () => {

        if(!$scope.updatedItem.gst || isNaN(parseInt($scope.updatedItem.gst))){
            alert('Select GST')
            return
        }
    
        $("#updateItem").modal('hide')
        if (confirm("Are you sure!")) {
            let formData = { 
                itemId:  $scope.updatedItem.item_id,
                unitPrice: parseFloat($scope.updatedItem.unit_price).toFixed(2),
                purchaseRate: parseFloat($scope.updatedItem.purchase_rate).toFixed(2),
                sellingPrice: parseFloat($scope.updatedItem.selling_price).toFixed(2),
                discount: parseFloat($scope.updatedItem.discount).toFixed(2),
                gst:parseFloat($scope.updatedItem.gst)
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