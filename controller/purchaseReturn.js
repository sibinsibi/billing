var app = angular.module("purchaseReturn", ["ngCookies", "datatables"]);
app.controller("purchaseReturnCtrl", function (
  $scope,
  $http,
  $cookies,
  $route,
  $routeParams,
  $rootScope
) {
  !$cookies.get("username") ? (window.location.href = "index.html") : "";

  $scope.selected = ''

  $scope.getPurchase = () => {
    if (!$scope.invoiceNo) {
      alert("Enter invoice number");
      return;
    }

    if (!$scope.voucherNo) {
      alert("Enter voucher number");
      return;
    }

    $scope.voucherNo = $scope.voucherNo.toUpperCase();
    var formData = { invoiceNo: $scope.invoiceNo, voucherNo: $scope.voucherNo };
    var postData = "myData=" + JSON.stringify(formData);
    $http({
      method: "POST",
      url: "./server/return/getPurchase.php",
      data: postData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => {
        if (res.data.length) {
          $scope.selected = res.data;
        } else {
          alert("Enter correct invoice number or Voucher number");
        }
        $rootScope.loader = false;
      })
      .catch((error) => {
        $rootScope.loader = false;
        alert("Something went wrong");
      });
  };

  $scope.delete = () => {
    if (confirm("Are you sure! Data permanantly delete")) {
      $rootScope.loader = true;
      var formData = { invoiceNo: $scope.invoiceNo, voucherNo: $scope.voucherNo };
      var postData = "myData=" + JSON.stringify(formData);
      $http({
        method: "POST",
        url: "./server/return/deletePurchase.php",
        data: postData,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
        .then((res) => {
          alert('Deleted Successfully')
          window.location.reload()
        })
        .catch((error) => {
          $rootScope.loader = false;
          alert("Something went wrong");
        });
    }
  }

});
