var app = angular.module("myApp", ["ngCookies", "ngRoute", "dashboard", "brands", "units", "items"])
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
});
app.run(function($rootScope, $cookies, $window) {
  $rootScope.loginUser = $cookies.get("username");

  $rootScope.logout = () => {
    $cookies.remove('username');
    $window.location.href = 'index.html';
  }
})