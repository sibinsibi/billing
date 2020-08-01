var app = angular.module('units', ['ngCookies', 'datatables']);
app.controller('unitCtrl', function($scope, $http, $cookies, $route) {

    !$cookies.get("username") ? window.location.href = "index.html" : '';

    let unitId = ''
    $scope.allUnits = [];
    $http.get('./server/unit/getAllUnit.php').then((res) => {
        if(res.data.records.length){
            $scope.allUnits = res.data.records
             let lastUnit =  $scope.allUnits[$scope.allUnits.length - 1].unit_id;
             lastUnitId  = parseInt(lastUnit.match(/\d+/g)[0]);
             lastUnitId++
        }
    }).catch((error) => {
        console.log(error)
    });
    
    $scope.addUnit = () => {

        if(!$scope.newUnit){
            alert('Enter unit name')
            return
        }

        $scope.newUnit.trim();
        $scope.newUnit = $scope.newUnit.charAt(0).toUpperCase() + $scope.newUnit.slice(1);
        let formData, postData;
        if($scope.allUnits.length){

            let bId = 'UT' + String(lastUnitId)
            formData = { unitId: bId, unitName: $scope.newUnit };
            postData = 'myData='+JSON.stringify(formData);

        }else{
            formData = { unitId: 'UT1', unitName: $scope.newUnit };
            postData = 'myData='+JSON.stringify(formData);
        }

        $http({
            method : 'POST',
            url : './server/unit/addNewUnit.php',
            data: postData,
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then((res) => {
            if(res.data.flag){
                alert('Added Successfully');
                $route.reload();
            }
            else{
                alert('Failed, try again!!')
                $route.reload();

            }
        }).catch((error) => {
            alert('Something went wrong')
        });
       
    }

    $scope.deleteUnit = (id) => {
        if (confirm("Are you sure!")) {
            let formData = { unitId: id };
            let postData = 'myData='+JSON.stringify(formData);
            $http({
                method : 'POST',
                url : './server/unit/deleteUnit.php',
                data: postData,
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then((res) => {
                if(res.data.flag){
                    alert('Deleted Successfully');
                    $route.reload();
                }
                else{
                    alert('Failed, try again!!')
                    $route.reload();
    
                }
            }).catch((error) => {
                alert('Something went wrong')
                $route.reload();
            });
            
        } 
        
    }

    $scope.openModalUpdateUnit = (unit) => {
        $("#updateUnit").modal()
        $scope.updatedUnit = unit;
    }

    $scope.updateUnit = () => {
        $("#updateUnit").modal('hide')
        if (confirm("Are you sure!")) {
            $scope.updatedUnit.unit_name.trim();
            $scope.updatedUnit.unit_name = $scope.updatedUnit.unit_name.charAt(0).toUpperCase() + $scope.updatedUnit.unit_name.slice(1);
            let formData = { unitId:  $scope.updatedUnit.unit_id, unitName:  $scope.updatedUnit.unit_name };
            let postData = 'myData='+JSON.stringify(formData);
            $http({
                method : 'POST',
                url : './server/unit/updateUnit.php',
                data: postData,
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then((res) => {
                if(res.data.flag){
                    alert('Updated Successfully');
                    $route.reload();
                }
                else{
                    alert('Failed, try again!!')
                    $route.reload();
    
                }
            }).catch((error) => {
                alert('Something went wrong' + error)
                $route.reload();
            });
            
        } 
    }

    $("#updateUnit").on('hidden.bs.modal', function(){
        $route.reload();
    });

})