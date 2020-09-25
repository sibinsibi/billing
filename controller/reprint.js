var app = angular.module("reprint", ["ngCookies", "datatables"]);
app.controller("reprintCtrl", function (
  $scope,
  $http,
  $cookies,
  $location,
  $rootScope
) {
  !$cookies.get("username") ? (window.location.href = "index.html") : "";

  $scope.getInvoice = () => {
    if (!$scope.invoiceNo) {
      alert("Enter invoice number");
      return;
    }
    $scope.invoiceNo = $scope.invoiceNo.toUpperCase();
    var formData = { invoiceNo: $scope.invoiceNo };
    var postData = "myData=" + JSON.stringify(formData);
    $http({
      method: "POST",
      url: "./server/invoice/getInvoice.php",
      data: postData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => {
        if (res.data.records[0].length) {
          $location.url("/invoice/" + $scope.invoiceNo);
        } else {
          alert("Enter correct invoice number");
        }
        $rootScope.loader = false;
      })
      .catch((error) => {
        $rootScope.loader = false;
        alert("Something went wrong");
      });
  };
});
