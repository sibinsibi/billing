var app = angular.module("company", ["ngCookies", "datatables"]);
app.controller("companyCtrl", function ($scope, $http, $cookies, $route) {
  !$cookies.get("username") ? (window.location.href = "index.html") : "";

  $scope.company = "";
  $scope.show = false;
  $http
    .get("./server/company/getCompanyDetails.php")
    .then((res) => {
      if (res.data.records.length) {
        $scope.company = res.data.records;
        $scope.show = true;
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
