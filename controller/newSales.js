var app = angular.module("newSales", ["ngCookies", "datatables"]);
app.controller("newSalesCtrl", function (
  $scope,
  $http,
  $cookies,
  $route,
  $rootScope
) {
  !$cookies.get("username") ? (window.location.href = "index.html") : "";

  $scope.qty = 1;
  $scope.discount = 0;
  $scope.cId = "";

  $http
    .get("./server/sales/getSid.php")
    .then((res) => {
      if (res.data.records.length) {
        const allItems = res.data.records;
        let lastItem = allItems[allItems.length - 1].invoice_no;
        let lastpId = parseInt(lastItem.match(/\d+/g)[0]);
        lastpId++;
        $scope.invoiceNo = "INV" + String(lastpId);
      } else {
        $scope.invoiceNo = "INV1";
      }
    })
    .catch((error) => {
      console.log(error);
    });

  $scope.allGst = [];
  $http
    .get("./server/tax/getAllGst.php")
    .then((res) => {
      if (res.data.records.length) {
        $scope.allGst = res.data.records;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  $("#cName").autocomplete({
    source: "./server/sales/getAllCustomer.php",
    select: function (event, data) {
      $scope.mob = data.item.mob;
      $scope.cId = data.item.id;
    },
  });
  $("#cName").on("change keyup copy paste cut", () => {
    if (!$("#cName").val()) {
      $scope.cId = "";
      $scope.mob = "";
    }
  });

  $scope.selectedItem = "";
  $("#itemName").autocomplete({
    source: "./server/sales/getAllItem.php",
    select: function (event, data) {
      $scope.selectedItem = data.item;

      $scope.selectedItem.discount = parseFloat($scope.selectedItem.discount);
      $scope.sellingPrice = parseFloat($scope.selectedItem.selling_price);
      //$scope.unitPrice = parseFloat($scope.selectedItem.unit_price);
      $scope.gst = $scope.selectedItem.gst;
      $scope.discount = parseFloat($scope.selectedItem.discount);
      $scope.stock = parseFloat($scope.selectedItem.stock);

      $scope.brand = $scope.selectedItem.brand;
      $scope.unit = $scope.selectedItem.unit;

      $scope.qty = 1;
      $scope.taxAmount =
        $scope.sellingPrice * $scope.qty * (parseFloat($scope.gst) / 100);
      $scope.taxAmount = parseFloat($scope.taxAmount.toFixed(2));
      $scope.itemTotalAmount =
        $scope.sellingPrice * $scope.qty + $scope.taxAmount - $scope.discount;
      $scope.itemTotalAmount = parseFloat($scope.itemTotalAmount.toFixed(2));
    },
  });

  $("#itemName").on("change keyup copy paste cut", () => {
    if (!$("#itemName").val()) {
      $scope.brand = "";
      $scope.unit = "";
      //$scope.unitPrice = "";
      $scope.sellingPrice = "";
      $scope.gst = "";
      $scope.qty = 1;
      $scope.taxAmount = "";
      $scope.discount = 0;
      $scope.itemTotalAmount = "";
      $scope.stock = 0;

      $scope.selectedItem = "";
      $("#itemName").focus();
    }
  });

  $scope.calculateItem = () => {
    if ($scope.qty && $scope.sellingPrice && $scope.gst) {
      $scope.taxAmount =
        $scope.sellingPrice * $scope.qty * (parseFloat($scope.gst) / 100);
      $scope.taxAmount = parseFloat($scope.taxAmount.toFixed(2));
      $scope.itemTotalAmount =
        $scope.sellingPrice * $scope.qty + $scope.taxAmount - $scope.discount;
      $scope.itemTotalAmount = parseFloat($scope.itemTotalAmount.toFixed(2));
    }
  };

  $scope.addedItems = [];
  $scope.addItem = async () => {
    const duplicate = await checkDuplicate();
    if (duplicate) {
      alert("Already added.If you want to change qty , delete and add again");
      await clearItem();
      return;
    }

    if ($scope.qty > $scope.stock) {
      if (!confirm($scope.stock + " only available. Continue ?")) {
        return;
      }
    }
    if (!$scope.item) {
      alert("Enter Item");
      return;
    }
    if (!$scope.brand) {
      alert("Enter Brand");
      return;
    }
    if (!$scope.sellingPrice) {
      alert("Enter Selling Price");
      return;
    }
    if (!$scope.gst) {
      alert("Select GST");
      return;
    }
    if (!$scope.qty || $scope.qty == 0) {
      alert("Enter Qty");
      return;
    }

    let obj = {};

    obj.item = $scope.item;
    obj.itemId = $scope.selectedItem.id;
    obj.brand = $scope.brand;
    obj.unit = $scope.unit;
    // obj.unitPrice = $scope.unitPrice;
    obj.unitPrice = 0;
    obj.sellingPrice = $scope.sellingPrice;
    obj.gst = parseFloat($scope.gst);
    obj.qty = $scope.qty;
    obj.taxAmount = $scope.taxAmount;
    obj.discount = $scope.discount;
    obj.itemTotalAmount = $scope.itemTotalAmount;

    $scope.addedItems.push(obj);

    await clearItem();
    $scope.$applyAsync(() => {
      setTimeout(() => {
        $scope.calculateTotalPrice();
      }, 100);
    });
  };

  const checkDuplicate = () => {
    return (
      $scope.addedItems.filter((c) => $scope.selectedItem.id === c.itemId)
        .length > 0
    );
  };

  const clearItem = () => {
    $scope.$applyAsync(() => {
      $scope.item = "";
      $scope.brand = "";
      $scope.unit = "";
      $scope.unitPrice = "";
      $scope.sellingPrice = "";
      $scope.gst = "";
      $scope.qty = 1;
      $scope.stock = 0;
      $scope.taxAmount = "";
      $scope.discount = 0;
      $scope.itemTotalAmount = "";
      $scope.selectedItem = "";
      $("#itemName").focus();
    });
  };

  $scope.deleteItem = (index) => {
    if (confirm("Are you sure!")) {
      $scope.addedItems.splice(index, 1);
      $scope.calculateTotalPrice();
    }
  };

  $scope.totalTaxAmount = 0;
  $scope.totalDiscount = 0;
  $scope.netAmount = 0;
  $scope.grandTotal = 0;
  $scope.roundOf = 0;
  $scope.paid = 0;
  $scope.balance = 0;
  $scope.remarks = "";

  $scope.calculateTotalPrice = () => {
    $scope.totalTaxAmount = 0;
    $scope.totalDiscount = 0;
    $scope.netAmount = 0;
    $scope.grandTotal = 0;
    $scope.roundOf = 0;
    $scope.paid = 0;
    $scope.balance = 0;
    if ($scope.addedItems.length) {
      for (let i = 0; i < $scope.addedItems.length; i++) {
        const item = $scope.addedItems[i];
        $scope.totalTaxAmount = parseFloat(
          ($scope.totalTaxAmount + item.taxAmount).toFixed(2)
        );
        $scope.totalDiscount = parseFloat(
          ($scope.totalDiscount + item.discount).toFixed(2)
        );
        $scope.netAmount = parseFloat(
          ($scope.netAmount + item.sellingPrice).toFixed(2)
        );
        $scope.grandTotal = parseFloat(
          (
            $scope.totalTaxAmount +
            $scope.netAmount -
            $scope.totalDiscount
          ).toFixed(2)
        );
        $scope.roundOf = parseFloat($scope.grandTotal.toFixed(2));
        $scope.paid = $scope.grandTotal;
      }
    }
  };

  $scope.changeInDiscount = () => {
    $scope.grandTotal = parseFloat(
      ($scope.totalTaxAmount + $scope.netAmount - $scope.totalDiscount).toFixed(
        2
      )
    );
    $scope.roundOf = parseFloat($scope.grandTotal.toFixed(2));
    $scope.paid = $scope.grandTotal;
    $scope.balance = 0;
  };

  $scope.changeInPaid = () => {
    if ($scope.paid > $scope.grandTotal) {
      $scope.paid = $scope.grandTotal;
      return;
    }
    if ($scope.grandTotal >= $scope.paid) {
      $scope.balance = parseFloat(($scope.grandTotal - $scope.paid).toFixed(2));
    }
  };

  $scope.cashCredit = true;
  $scope.submitInvoice = () => {
    if (!$scope.invoiceDate) {
      alert("Enter invoice date");
      return;
    }
    if (!$scope.cName) {
      alert("Enter Customer Name");
      return;
    }

    if (!$scope.addedItems.length) {
      alert("Add atleast one item");
      return;
    }

    $scope.cashCredit
      ? ($scope.cashCredit = "cash")
      : ($scope.cashCredit = "credit");
    if ($scope.cashCredit == "credit" && $scope.balance == 0) {
      alert("If bill is credit, enter balance amount");
      return;
    }
    $rootScope.loader = true;

    $scope.invoiceDate = moment($scope.invoiceDate).format("YYYY-MM-DD");

    let formData = {
      invoiceNo: $scope.invoiceNo,
      invoiceDate: $scope.invoiceDate,
      cId: $scope.cId,
      cName: $scope.cName,
      mob: $scope.mob ? ($scope.mob = $scope.mob) : ($scope.mob = ""),
      cashCredit: $scope.cashCredit,
      netAmount: $scope.netAmount,
      totalTaxAmount: $scope.totalTaxAmount,
      totalDiscount: $scope.totalDiscount,
      grandTotal: $scope.grandTotal,
      roundOf: $scope.roundOf,
      paid: $scope.paid,
      balance: $scope.balance,
      remarks: $scope.remarks
        ? ($scope.remarks = $scope.remarks)
        : ($scope.remarks = ""),
      transactionCompleted: $scope.balance == 0 ? true : false,
      items: $scope.addedItems,
    };

    let postData = "myData=" + JSON.stringify(formData);

    $http({
      method: "POST",
      url: "./server/sales/addNewSale.php",
      data: postData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => {
        alert("Added Successfully");
        window.location.reload();
      })
      .catch((error) => {
        alert("Something went wrong");
        $rootScope.loader = false;
      });
  };
});
