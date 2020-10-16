var app = angular.module("allCreditBillsPurchase", ["ngCookies", "datatables"]);
app.controller("allCreditBillsPurchaseCtrl", function (
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

  $scope.getPurchaseByDate = () => {
    let startDate = moment($scope.startDate).format("YYYY-MM-DD");
    let endDate = moment($scope.endDate).format("YYYY-MM-DD");
    getAllPurchase("", "Date", startDate, endDate);
  };

  const getAllPurchase = (id, flag, startDate, endDate) => {
    let formData, postData;

    if (flag == "supplier") {
      formData = { sId: id, flag: flag };
      postData = "myData=" + JSON.stringify(formData);
    }
    if (flag == "Date") {
      formData = { startDate: startDate, endDate: endDate, flag: flag };
      postData = "myData=" + JSON.stringify(formData);
    }

    $rootScope.loader = true;
    $http({
      method: "POST",
      url: "./server/purchase/allCreditBillsPurchase.php",
      data: postData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => {
        if (res.data.length) {
          $scope.allPurchases = res.data;
        } else {
          alert("Not Found");
          $scope.allPurchases = [];
        }
        $rootScope.loader = false;
      })
      .catch((error) => {
        alert("Something went wrong");
        $rootScope.loader = false;
        $scope.allPurchases = [];
      });
  };
});
