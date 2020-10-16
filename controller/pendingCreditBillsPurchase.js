var app = angular.module("pendingCreditBillsPurchase", ["ngCookies", "datatables"]);
app.controller("pendingCreditBillsPurchaseCtrl", function (
  $scope,
  $http,
  $cookies,
 $window,
  $rootScope
) {
  !$cookies.get("username") ? (window.location.href = "index.html") : "";

  $scope.allPurchases = [];
  $rootScope.loader = true;

  $http.get('./server/purchase/getPendingCreditBillsPurchase.php').then((res) => {
        if (res.data.length) {
          $scope.allPurchases = res.data;
        } 
        $rootScope.loader = false;
      })
      .catch((error) => {
        console.log(error)
        $rootScope.loader = false;
      });
  $scope.open = (id) => {
          $window.open('#!pendingCreditBillPurchase/' + id, '_blank');

  }
});
