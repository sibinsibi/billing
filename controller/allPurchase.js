var app = angular.module("allPurchase", ["ngCookies", "datatables"]);
app.controller("allPurchaseCtrl", function (
  $scope,
  $http,
  $cookies,
  $route,
  $rootScope
) {
  !$cookies.get("username") ? (window.location.href = "index.html") : "";

  $scope.allPurchases = [];

  $("#sName").autocomplete({
    source: "./server/purchase/getAllSupplier.php",
    select: function (event, data) {
      let sId = data.item.id;
      getAllPurchase(sId, "supplier");
    },
  });

  const getAllPurchase = (id, flag) => {
    let formData = { sId: id, flag: flag };
    let postData = "myData=" + JSON.stringify(formData);

    $rootScope.loader = true;
    $http({
      method: "POST",
      url: "./server/purchase/getAllPurchase.php",
      data: postData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => {
        if (res.data.length) {
          $scope.allPurchases = res.data;
        } else {
          alert("Not Found");
        }
        $rootScope.loader = false;
      })
      .catch((error) => {
        alert("Something went wrong");
        $rootScope.loader = false;
      });
  };

  $scope.openModalShowItems = (vNo) => {
    let formData = { vNo: vNo };
    let postData = "myData=" + JSON.stringify(formData);
    $scope.allPurchasesItems = [];

    $rootScope.loader = true;
    $http({
      method: "POST",
      url: "./server/purchase/getPurchaseItems.php",
      data: postData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => {
        if (res.data.length) {
          $scope.allPurchasesItems = res.data;
          $("#items").modal();
        } else {
          alert("Not Found");
        }
        $rootScope.loader = false;
      })
      .catch((error) => {
        alert("Something went wrong");
        $rootScope.loader = false;
      });
  };
});
