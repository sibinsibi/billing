var app = angular.module("pendingCreditBillsSales", ["ngCookies", "datatables"]);
app.controller("pendingCreditBillsSalesCtrl", function (
  $scope,
  $http,
  $cookies,
 $window,
  $rootScope
) {
  !$cookies.get("username") ? (window.location.href = "index.html") : "";

  $scope.allPurchases = [];
  $rootScope.loader = true;

  $http.get('./server/sales/getPendingCreditBillsSales.php').then((res) => {
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
      $window.open('#!pendingCreditBillSales/' + id, '_blank');
  }
});
