var app = angular.module('newPurchase', ['ngCookies', 'datatables']);
app.controller('newPurchaseCtrl', function($scope, $http, $cookies, $route, $rootScope) {

    !$cookies.get("username") ? window.location.href = "index.html" : '';
    $rootScope.loader = false;
    $("#voucherNo").focus();

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
            $scope.discount = '';
            $scope.itemTotalAmount = '';

            $scope.selectedItem = '';
            $("#itemName").focus();

        }
    });

    $scope.calculateItem = () => {
        if($scope.qty && $scope.purchaseRate && $scope.gst){
            $scope.taxAmount = ($scope.purchaseRate *  $scope.qty) * (parseFloat($scope.gst)/100);
            $scope.taxAmount = parseFloat($scope.taxAmount.toFixed(2));
            $scope.itemTotalAmount = (($scope.purchaseRate * $scope.qty) + $scope.taxAmount) - $scope.discount ;
            $scope.itemTotalAmount = parseFloat($scope.itemTotalAmount.toFixed(2))

        }
      }

    $scope.addedItems = [];
    $scope.addItem = () => {
        if(!$scope.item){
            alert('Enter Item');
            return
        }
        if(!$scope.brand){
            alert('Enter Brand');
            return
        }
        if(!$scope.sellingPrice){
            alert('Enter Selling Price');
            return
        }
        if(!$scope.purchaseRate){
            alert('Enter Purchase Rate');
            return
        }
        if(!$scope.gst){
            alert('Select GST');
            return
        }
        if(!$scope.qty || $scope.qty == 0){
            alert('Enter Qty');
            return
        }

        let obj = {};

        obj.item = $scope.item;
        obj.brand = $scope.brand;
        obj.unit = $scope.unit;
        obj.unitPrice = $scope.unitPrice;
        obj.sellingPrice = $scope.sellingPrice;
        obj.purchaseRate = $scope.purchaseRate;
        obj.gst = parseFloat($scope.gst);
        obj.qty = $scope.qty;
        obj.taxAmount = $scope.taxAmount;
        obj.discount = $scope.discount;
        obj.itemTotalAmount = $scope.itemTotalAmount;

        $scope.addedItems.push(obj);
        $scope.item = '';
        $('#itemName').trigger('keyup');
        $scope.calculateTotalPrice();

    }

    $scope.deleteItem = (index) => {
        if (confirm("Are you sure!")) {
            $scope.addedItems.splice(index, 1);
            $scope.calculateTotalPrice();
        }
    }

    $scope.totalTaxAmount = 0;
    $scope.totalDiscount= 0;
    $scope.netAmount = 0;
    $scope.grandTotal = 0;
    $scope.roundOf = 0;
    $scope.paid = 0;
    $scope.balance = 0;
    $scope.remarks = '';

    $scope.calculateTotalPrice = () =>{
        $scope.totalTaxAmount = 0;
        $scope.totalDiscount= 0;
        $scope.netAmount = 0;
        $scope.grandTotal = 0;
        $scope.roundOf = 0;
        $scope.paid = 0;
        $scope.balance = 0;
        if($scope.addedItems.length){
            for(let i = 0; i <  $scope.addedItems.length; i++){
                const item = $scope.addedItems[i];
                $scope.totalTaxAmount = parseFloat(($scope.totalTaxAmount + item.taxAmount).toFixed(2));
                $scope.totalDiscount = parseFloat(($scope.totalDiscount + item.discount).toFixed(2));
                $scope.netAmount = parseFloat(($scope.netAmount + item.purchaseRate).toFixed(2));
                $scope.grandTotal = parseFloat((($scope.totalTaxAmount + $scope.netAmount) - $scope.totalDiscount).toFixed(2));
                $scope.roundOf =  parseFloat(($scope.grandTotal).toFixed(2));
                $scope.paid = $scope.grandTotal;
            }
        }

    }

    $scope.changeInDiscount = () => {
        $scope.grandTotal = parseFloat((($scope.totalTaxAmount + $scope.netAmount) - $scope.totalDiscount).toFixed(2));
        $scope.roundOf =  parseFloat(($scope.grandTotal).toFixed(2));
        $scope.paid = $scope.grandTotal;
    }

    $scope.changeInPaid = () => {
        if($scope.grandTotal >= $scope.paid){
            $scope.balance = parseFloat(($scope.grandTotal - $scope.paid).toFixed(2));
        }
    }
})