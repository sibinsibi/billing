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

  $rootScope.loader = true;
  $scope.voucher_no = $routeParams.id;

  let formData = { voucherNo: $scope.voucher_no };
  let postData = 'myData='+JSON.stringify(formData);
        

  $http({
      method : 'POST',
      url : './server/purchase/getPendingCreditBillPurchase.php',
      data: postData,
      headers : {'Content-Type': 'application/x-www-form-urlencoded'}
  }).then((res) => {
      if(res.data){
        $scope.allCredits = res.data;
      }
      else{
          alert('No data available')
      }
      $rootScope.loader = false;

  }).catch((error) => {
      alert('Something went wrong')
      $rootScope.loader = false;
  });
});
