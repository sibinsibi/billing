var app = angular.module("items", ["ngCookies", "datatables"]);
app.controller("itemCtrl", function (
  $scope,
  $http,
  $cookies,
  $route,
  $rootScope
) {
  !$cookies.get("username") ? (window.location.href = "index.html") : "";
  $("#newItem").focus();
  $rootScope.loader = false;

  $scope.allItems = [];
  let lastItemId = "";
  $http
    .get("./server/item/getAllItem.php")
    .then((res) => {
      if (res.data.records.length) {
        $scope.allItems = res.data.records;
        let lastItem = $scope.allItems[$scope.allItems.length - 1].item_id;
        lastItemId = parseInt(lastItem.match(/\d+/g)[0]);
        lastItemId++;
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

  $("#brands").autocomplete({
    source: "./server/brand/getBrand.php",
    select: function (event, data) {
      //$scope.brand = data.item;
    },
  });

  // $scope.allBrands = [];
  // $http.get('./server/brand/getAllBrand.php').then((res) => {
  //     if(res.data.records.length){
  //         let allBrands = res.data.records;
  //         let  brands = []
  //         for(let i = 0; i < allBrands.length; i++){
  //             brands.push(allBrands[i].brand_name)
  //         }
  //         $scope.allBrands = brands;
  //     }
  // }).catch((error) => {
  //     console.log(error)
  // });

  $scope.allUnits = [];
  $http
    .get("./server/unit/getAllUnit.php")
    .then((res) => {
      if (res.data.records.length) {
        let allUnits = res.data.records;
        let units = [];
        for (let i = 0; i < allUnits.length; i++) {
          units.push(allUnits[i].unit_name);
        }
        $scope.allUnits = units;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  $scope.addItem = () => {
    $scope.unitPrice = $("#unitPrice").val();
    if (!$scope.newItem || !$scope.brand) {
      alert("Enter all data");
      return;
    }
    if (!$scope.gst || isNaN(parseInt($scope.gst))) {
      alert("Select GST");
      return;
    }

    $scope.newItem.trim();
    $scope.newItem =
      $scope.newItem.charAt(0).toUpperCase() + $scope.newItem.slice(1);

    $scope.brand.trim();
    $scope.brand = $scope.brand.charAt(0).toUpperCase() + $scope.brand.slice(1);

    $scope.unit ? ($scope.unit = $scope.unit) : ($scope.unit = null);
    $scope.unitPrice
      ? ($scope.unitPrice = $scope.unitPrice)
      : ($scope.unitPrice = 0);
    $scope.purchaseRate
      ? ($scope.purchaseRate = $scope.purchaseRate)
      : ($scope.purchaseRate = 0);
    $scope.sellingPrice
      ? ($scope.sellingPrice = $scope.sellingPrice)
      : ($scope.sellingPrice = 0);
    $scope.discount
      ? ($scope.discount = $scope.discount)
      : ($scope.discount = 0);

    let formData = {
      newItem: $scope.newItem,
      brand: $scope.brand,
      unit: $scope.unit,
      gst: parseFloat($scope.gst),
      unitPrice: parseFloat($scope.unitPrice).toFixed(2),
      purchaseRate: parseFloat($scope.purchaseRate).toFixed(2),
      sellingPrice: parseFloat($scope.sellingPrice).toFixed(2),
      discount: parseFloat($scope.discount).toFixed(2),
    };

    if ($scope.allItems.length) {
      formData.itemId = "ITM" + String(lastItemId);
    } else {
      formData.itemId = "ITM1";
    }

    let postData = "myData=" + JSON.stringify(formData);

    $http({
      method: "POST",
      url: "./server/item/addNewItem.php",
      data: postData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => {
        if (res.data.flag) {
          alert("Added Successfully");
          window.location.reload();
        } else {
          alert("Failed, try again!!");
          window.location.reload();
        }
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };

  $scope.deleteItem = (id) => {
    if (confirm("Are you sure!")) {
      let formData = { itemId: id };
      let postData = "myData=" + JSON.stringify(formData);
      $http({
        method: "POST",
        url: "./server/item/deleteItem.php",
        data: postData,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
        .then((res) => {
          if (res.data.flag) {
            alert("Deleted Successfully");
            window.location.reload();
          } else {
            alert("Failed, try again!!");
            window.location.reload();
          }
        })
        .catch((error) => {
          alert("Something went wrong");
          window.location.reload();
        });
    }
  };

  $scope.openModalUpdateItem = (item) => {
    $("#updateItem").modal();
    const items = item;
    items.unit_price = parseFloat(parseFloat(items.unit_price).toFixed(2));
    $scope.$applyAsync(() => {
      $scope.updatedItem = items;
    });
  };

  $scope.updateItem = () => {
    $scope.updatedUnitPrice = $("#updatedUnitPrice").val();

    if (!$scope.updatedItem.item_name || !$scope.updatedItem.brand) {
      alert("Enter all data");
      return;
    }

    if ($scope.updatedItem.unit && !$scope.updatedUnitPrice) {
      alert("Enter unit price");
      return;
    }

    $("#updateItem").modal("hide");
    if (confirm("Are you sure!")) {
      $scope.updatedItem.item_name.trim();
      $scope.updatedItem.item_name =
        $scope.updatedItem.item_name.charAt(0).toUpperCase() +
        $scope.updatedItem.item_name.slice(1);
      let formData = {
        itemId: $scope.updatedItem.item_id,
        itemName: $scope.updatedItem.item_name,
        brand: $scope.updatedItem.brand,
        unit: $scope.updatedItem.unit,
      };
      if ($scope.updatedItem.unit) {
        formData.unitPrice = parseFloat($scope.updatedUnitPrice).toFixed(2);
      }
      let postData = "myData=" + JSON.stringify(formData);
      $http({
        method: "POST",
        url: "./server/item/updateItem.php",
        data: postData,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
        .then((res) => {
          if (res.data.flag) {
            alert("Updated Successfully");
            window.location.reload();
          } else {
            alert("Failed, try again!!");
            window.location.reload();
          }
        })
        .catch((error) => {
          alert("Something went wrong" + error);
          window.location.reload();
        });
    }
  };

  $("#updateItem").on("hidden.bs.modal", function () {
    window.location.reload();
  });
});
