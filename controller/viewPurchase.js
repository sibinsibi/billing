var app = angular.module("viewPurchase", ["ngCookies", "datatables"]);
app.controller("viewPurchaseCtrl", function (
  $scope,
  $http,
  $cookies,
  $location,
  $rootScope
) {
  !$cookies.get("username") ? (window.location.href = "index.html") : "";

  $scope.getInvoice = () => {
    if (!$scope.invoiceNo && !$scope.voucherNo) {
      alert("Enter invoice number or voucher number");
      return;
    }

    $rootScope.loader = true;
    var formData, postData = ''

    if ($scope.invoiceNo && !$scope.voucherNo) {
        formData = { invoiceNo: $scope.invoiceNo, voucherNo: '' };
        postData = "myData=" + JSON.stringify(formData);
    }

    if ($scope.voucherNo && !$scope.invoiceNo) {
        $scope.voucherNo = $scope.voucherNo.toUpperCase();
        formData = { voucherNo: $scope.voucherNo, invoiceNo: '' };
        postData = "myData=" + JSON.stringify(formData);
    }

    if ($scope.voucherNo && $scope.invoiceNo) {
        $scope.voucherNo = $scope.voucherNo.toUpperCase();
        formData = { voucherNo: $scope.voucherNo, invoiceNo: $scope.invoiceNo };
        postData = "myData=" + JSON.stringify(formData);
    }

    $http({
      method: "POST",
      url: "./server/purchase/getSinglePurchase.php",
      data: postData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => {
        if (res.data.records[0].length) {
          $scope.bill = res.data.records[0][0];
            $scope.items = res.data.records[1];
        } else {
            alert("Details not available");
          }
          $rootScope.loader = false;
      })
      .catch((error) => {
        $rootScope.loader = false;
        alert("Something went wrong");
      });
  };
});
