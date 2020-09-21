var app = angular.module('newSales', ['ngCookies', 'datatables']);
app.controller('newSalesCtrl', function($scope, $http, $cookies, $route) {

    !$cookies.get("username") ? window.location.href = "index.html" : '';
   

})