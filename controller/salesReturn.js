var app = angular.module("salesReturn", ["ngCookies", "datatables"]);
app.controller("salesReturnCtrl", function (
  $scope,
  $http,
  $cookies,
  $route,
  $routeParams,
  $rootScope
) {
  !$cookies.get("username") ? (window.location.href = "index.html") : "";

  $scope.selected = ''

  $scope.getSales = () => {
    if (!$scope.invoiceNo) {
      alert("Enter invoice number");
      return;
    }

    $scope.invoiceNo = $scope.invoiceNo.toUpperCase();
    var formData = { invoiceNo: $scope.invoiceNo };
    var postData = "myData=" + JSON.stringify(formData);
    $http({
      method: "POST",
      url: "./server/return/getSales.php",
      data: postData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => {
        if (res.data.length) {
          $scope.selected = res.data;
        } else {
          alert("Enter correct invoice number or not found");
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
      var formData = { invoiceNo: $scope.invoiceNo };
      var postData = "myData=" + JSON.stringify(formData);
      $http({
        method: "POST",
        url: "./server/return/deleteSales.php",
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
