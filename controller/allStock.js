var app = angular.module("allStock", ["ngCookies", "datatables"]);
app.controller("allStockCtrl", function ($scope, $http, $cookies, $route) {
  !$cookies.get("username") ? (window.location.href = "index.html") : "";

  $http
    .get("./server/stock/getAllStock.php")
    .then((res) => {
      if (res.data.records.length) {
        $scope.allStock = res.data.records;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  $("#itemName").autocomplete({
    source: "./server/purchase/getAllItem.php",
    select: function (event, data) {
      $scope.selectedItem = data.item;
    },
  });
  $("#itemName").on("change keyup copy paste cut", () => {
    if (!$("#itemName").val()) {
      $scope.selectedItem = "";
    }
  });

  $scope.addNewStock = () => {
    if (!$scope.selectedItem) {
      alert("Select item from list");
      return;
    }
    if (!$scope.itemName) {
      alert("Enter item");
      return;
    }
    if (!$scope.qty) {
      alert("Enter stock");
      return;
    }

    let formData = {
      itemId: $scope.selectedItem.id,
      itemName: $scope.selectedItem.value,
      brand: $scope.selectedItem.brand,
      stock: parseFloat($scope.qty),
    };

    let postData = "myData=" + JSON.stringify(formData);

    $http({
      method: "POST",
      url: "./server/stock/addNewOpeningStock.php",
      data: postData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => {
        if (res.data.flag) {
          alert("Added Successfully");
          $route.reload();
        } else {
          alert("Failed, try again!!");
          $route.reload();
        }
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };

  $scope.openModalUpdateStock = (stock) => {
    $("#updateStock").modal();
    $scope.updatedStock = stock;
  };

  $scope.updateStock = () => {
    if (!$scope.updatedStock.stock1) {
      alert("Enter Stock");
      return;
    }
    $("#updateStock").modal("hide");
    if (confirm("Are you sure!")) {
      let formData = {
        itemId: $scope.updatedStock.item_id,
        stock: $scope.updatedStock.stock1,
      };
      let postData = "myData=" + JSON.stringify(formData);
      $http({
        method: "POST",
        url: "./server/stock/updateStock.php",
        data: postData,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
        .then((res) => {
          if (res.data.flag) {
            alert("Updated Successfully");
            $route.reload();
          } else {
            alert("Failed, try again!!");
            $route.reload();
          }
        })
        .catch((error) => {
          alert("Something went wrong" + error);
          $route.reload();
        });
    }
  };

  $("#updateStock").on("hidden.bs.modal", function () {
    $route.reload();
  });
});
