
 var app = angular.module('loginApp', ['ngCookies']);
app.controller('login', function($scope, $http, $cookies) {

  $scope.login = () => {
      if(!$scope.username || !$scope.password){
        alert('Please fill the form');
        return
      }
      var formData = { username: $scope.username, password :  $scope.password };
      var postData = 'myData='+JSON.stringify(formData);
    $http({
            method : 'POST',
            url : './server/login.php',
            data: postData,
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then((res) => {
            if(res.data.records.length){
              $cookies.put("username", res.data.records[0].username);
            }else{
              alert('Username or Password Error');
              $scope.username = '';
              $scope.password = '';
            }
        }).catch((error) => {
            alert('Something went wrong')
        });
  }

});
