var app = angular.module('items', ['ngCookies', 'datatables']);
app.controller('itemCtrl', function($scope, $http, $cookies, $route) {

    !$cookies.get("username") ? window.location.href = "index.html" : '';

    $scope.allBrands = [];
    $http.get('./server/brand/getAllBrand.php').then((res) => {
        if(res.data.records.length){
            let allBrands = res.data.records;
            let  brands = []
            for(let i = 0; i < allBrands.length; i++){
                brands.push(allBrands[i].brand_name)
            }
            $scope.allBrands = brands;            
        }
    }).catch((error) => {
        console.log(error)
    });

    $scope.allUnits = [];
    $http.get('./server/unit/getAllUnit.php').then((res) => {
        if(res.data.records.length){
           let allUnits = res.data.records;
            let units = [];
            for(let i = 0; i < allUnits.length; i++){
                units.push(allUnits[i].unit_name);
            }
            $scope.allUnits = units;
        }
    }).catch((error) => {
        console.log(error)
    });

    $scope.getBrands = function(){
      $( "#brands" ).autocomplete({
        source: $scope.allBrands
      });
    } 
    $scope.getUnits = function(){
        $( "#units" ).autocomplete({
          source: $scope.allUnits
        });
      } 
    

})