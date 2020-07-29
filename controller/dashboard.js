var app = angular.module('dashboard', ['ngCookies']);
app.controller('dashboardCtrl', function($scope, $http, $cookies) {

    !$cookies.get("username") ? window.location.href = "index.html" : ''




})