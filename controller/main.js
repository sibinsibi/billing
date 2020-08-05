var app = angular.module("myApp", ["ngCookies", "ngRoute", "dashboard", "brands", "units", "items", "newPurchase"])
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
      .when("/newPurchase", {
        templateUrl : "pages/newPurchase.html",
        controller : "newPurchaseCtrl"
      })
});
app.run(function($rootScope, $cookies, $window) {
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
})