var app = angular
  .module("myApp", [
    "ngCookies",
    "ngRoute",
    "dashboard",
    "brands",
    "units",
    "items",
    "newPurchase",
    "supplier",
    "customer",
    "priceDetails",
    "allPurchase",
    "allStock",
    "company",
    "newSales",
    "invoice",
    "reprint",
    "allSales",
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "pages/dashboard.html",
        controller: "dashboardCtrl",
      })
      .when("/dashboard", {
        templateUrl: "pages/dashboard.html",
        controller: "dashboardCtrl",
      })
      .when("/brands", {
        templateUrl: "pages/brands.html",
        controller: "brandCtrl",
      })
      .when("/units", {
        templateUrl: "pages/units.html",
        controller: "unitCtrl",
      })
      .when("/items", {
        templateUrl: "pages/items.html",
        controller: "itemCtrl",
      })
      .when("/supplier", {
        templateUrl: "pages/supplier.html",
        controller: "supplierCtrl",
      })
      .when("/customer", {
        templateUrl: "pages/customer.html",
        controller: "customerCtrl",
      })
      .when("/newPurchase", {
        templateUrl: "pages/newPurchase.html",
        controller: "newPurchaseCtrl",
      })
      .when("/priceDetails", {
        templateUrl: "pages/priceDetails.html",
        controller: "priceDetailsCtrl",
      })
      .when("/allPurchase", {
        templateUrl: "pages/allPurchase.html",
        controller: "allPurchaseCtrl",
      })
      .when("/allStock", {
        templateUrl: "pages/allStock.html",
        controller: "allStockCtrl",
      })
      .when("/company", {
        templateUrl: "pages/company.html",
        controller: "companyCtrl",
      })
      .when("/newSale", {
        templateUrl: "pages/newSales.html",
        controller: "newSalesCtrl",
      })
      .when("/invoice/:id", {
        templateUrl: "pages/invoice.html",
        controller: "invoiceCtrl",
      })
      .when("/reprint", {
        templateUrl: "pages/reprint.html",
        controller: "reprintCtrl",
      })
      .when("/allSales", {
        templateUrl: "pages/allSales.html",
        controller: "allSalesCtrl",
      });
  });
app.run(function ($rootScope, $cookies, $window, $route, $http) {
  $rootScope.loginUser = $cookies.get("username");
  $rootScope.loader = false;

  $http
    .get("./server/company/getCompanyDetails.php")
    .then((res) => {
      if (res.data.records.length) {
        $rootScope.company = res.data.records[0];
      }
    })
    .catch((error) => {
      console.log(error);
    });

  $rootScope.d = moment().format("DD/MM/YYYY");
  $rootScope.t = moment().format("h:mm:ss a");

  setInterval(() => {
    $rootScope.$applyAsync(() => {
      $rootScope.t = moment().format("h:mm:ss a");
    });
  }, 1000);

  $rootScope.logout = () => {
    $cookies.remove("username");
    $window.location.href = "index.html";
  };

  $rootScope.backup = () => {
    $http
      .get("./server/backup/backup.php")
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
});
