var app = angular.module("myApp", ["ngCookies", "ngRoute", "dashboard", "brands", "units", "items", "newPurchase", 
"supplier", "customer", "priceDetails"])
.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "pages/dashboard.html",
        controller : "dashboardCtrl"
      })
      .when("/dashboard", {
        templateUrl : "pages/dashboard.html",
        controller : "dashboardCtrl"
      })
      .when("/brands", {
        templateUrl : "pages/brands.html",
        controller : "brandCtrl"
      })
      .when("/units", {
        templateUrl : "pages/units.html",
        controller : "unitCtrl"
      })
      .when("/items", {
        templateUrl : "pages/items.html",
        controller : "itemCtrl"
      })
      .when("/supplier", {
        templateUrl : "pages/supplier.html",
        controller : "supplierCtrl"
      })
      .when("/customer", {
        templateUrl : "pages/customer.html",
        controller : "customerCtrl"
      })
      .when("/newPurchase", {
        templateUrl : "pages/newPurchase.html",
        controller : "newPurchaseCtrl"
      })
      .when("/priceDetails", {
        templateUrl : "pages/priceDetails.html",
        controller : "priceDetailsCtrl"
      })
});
app.run(function($rootScope, $cookies, $window, $route) {
  $rootScope.loginUser = $cookies.get("username");

  $rootScope.d = moment().format('DD/MM/YYYY');
  $rootScope.t = moment().format('h:mm:ss a');

  setInterval(() => {
    $rootScope.$applyAsync(() => {
      $rootScope.t = moment().format('h:mm:ss a')
    })
  }, 1000)

  $rootScope.logout = () => {
    $cookies.remove('username');
    $window.location.href = 'index.html';
  }

  $rootScope.refresh = () => {
    $route.reload();
  }

})