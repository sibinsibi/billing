var app = angular.module('newPurchase', ['ngCookies', 'datatables']);
app.controller('newPurchaseCtrl', function($scope, $http, $cookies, $route) {

    !$cookies.get("username") ? window.location.href = "index.html" : '';

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

    $scope.allGst = []
    $http.get('./server/tax/getAllGst.php').then((res) => {
        if(res.data.records.length){
            $scope.allGst = res.data.records
        }
    }).catch((error) => {
        console.log(error)
    });

    $scope.selectedSupplier = '';
    $( "#sName" ).autocomplete({
        source: "./server/purchase/getAllSupplier.php",
        select: function(event, data) {
            $scope.selectedSupplier = data.item;
            $scope.mob = $scope.selectedSupplier.mob;
            $scope.gstNo = $scope.selectedSupplier.gst;
        }
      }); 

    $("#sName").on('change keyup copy paste cut', () => {
        if (!$("#sName").val()) {
            $scope.selectedSupplier = '';
            $scope.mob = '';
            $scope.gstNo = '';
        }
    });

    $scope.selectedItem = '';
    $( "#itemName" ).autocomplete({
        source: "./server/purchase/getAllItem.php",
        select: function(event, data) {

            $scope.selectedItem = data.item;

            $scope.selectedItem.discount = parseFloat($scope.selectedItem.discount);
            $scope.purchaseRate = parseFloat($scope.selectedItem.purchase_rate);
            $scope.sellingPrice = parseFloat($scope.selectedItem.selling_price);
            $scope.unitPrice = parseFloat($scope.selectedItem.unit_price);
            $scope.gst = $scope.selectedItem.gst;
            $scope.discount = parseFloat($scope.selectedItem.discount);

            $scope.brand = $scope.selectedItem.brand;
            $scope.unit = $scope.selectedItem.unit;

            $scope.qty = 1;
            $scope.taxAmount = ($scope.purchaseRate *  $scope.qty) * (parseFloat($scope.gst)/100);
            $scope.taxAmount = parseFloat($scope.taxAmount.toFixed(2));
            $scope.itemTotalAmount = (($scope.purchaseRate  * $scope.qty) + $scope.taxAmount) - $scope.discount ;
            $scope.itemTotalAmount = parseFloat( $scope.itemTotalAmount.toFixed(2))
        }
    });

    $("#itemName").on('change keyup copy paste cut', () => {
        if (!$("#itemName").val()) {
            $scope.brand = '';
            $scope.unit = '';
            $scope.unitPrice ='';
            $scope.sellingPrice = '';
            $scope.purchaseRate = '';
            $scope.gst = '';
            $scope.qty = '';
            $scope.taxAmount = '';
            $scope.itemTotalAmount = '';

            $scope.selectedItem = '';
        }
    });

    $scope.calculateItem = () => {
        if($scope.qty && $scope.purchaseRate && $scope.gst){
            $scope.taxAmount = ($scope.purchaseRate *  $scope.qty) * (parseFloat($scope.gst)/100);
            $scope.taxAmount = parseFloat($scope.taxAmount.toFixed(2));
            $scope.itemTotalAmount = (($scope.purchaseRate * $scope.qty) + $scope.taxAmount) - $scope.discount ;
            $scope.itemTotalAmount = parseFloat( $scope.itemTotalAmount.toFixed(2))

        }
      }
})