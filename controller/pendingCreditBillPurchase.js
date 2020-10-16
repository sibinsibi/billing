var app = angular.module("pendingCreditBillPurchase", ["ngCookies", "datatables"]);
app.controller("pendingCreditBillPurchaseCtrl", function (
  $scope,
  $http,
  $cookies,
  $window,
  $rootScope,
  $routeParams
) {
  !$cookies.get("username") ? (window.location.href = "index.html") : "";

console.log($routeParams.id)
 
});
