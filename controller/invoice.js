var app = angular.module("invoice", ["ngCookies", "datatables"]);
app.controller("invoiceCtrl", function ($scope, $http, $cookies, $route) {
  !$cookies.get("username") ? (window.location.href = "index.html") : "";
  console.log("dd");
  $http
    .get("./server/brand/getAllBrand.php")
    .then((res) => {
      if (res.data.records.length) {
        $scope.allBrands = res.data.records;
        let lastBrand = $scope.allBrands[$scope.allBrands.length - 1].brand_id;
        lastBrandId = parseInt(lastBrand.match(/\d+/g)[0]);
        lastBrandId++;
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
