var app = angular.module('customer', ['ngCookies', 'datatables']);
app.controller('customerCtrl', function($scope, $http, $cookies, $route) {

    !$cookies.get("username") ? window.location.href = "index.html" : '';

    let lastcId = ''
    $scope.allCustomers = [];
    $http.get('./server/supplier-customer/getAllCustomer.php').then((res) => {
        if(res.data.records.length){
            $scope.allCustomers = res.data.records
             let lastCustomer =  $scope.allCustomers[$scope.allCustomers.length - 1].c_id;
             lastcId  = parseInt(lastCustomer.match(/\d+/g)[0]);
             lastcId++
        }
    }).catch((error) => {
        console.log(error)
    });
    
    $scope.addCustomer = () => {

        if(!$scope.cName || !$scope.mob){
            alert('Enter all data')
            return
        }

        $scope.address ? $scope.address = $scope.address : $scope.address = ''

        $scope.cName.trim();
        $scope.cName = $scope.cName.charAt(0).toUpperCase() + $scope.cName.slice(1);
        let formData, postData;
        if($scope.allCustomers.length){
            let cId = 'CTR' + String(lastcId)
            formData = { cId: cId, cName: $scope.cName, mob: $scope.mob, address: $scope.address };
            postData = 'myData='+JSON.stringify(formData);
        }else{
            formData = { cId: 'CTR1', cName: $scope.cName, mob: $scope.mob, address: $scope.address };
            postData = 'myData='+JSON.stringify(formData);
        }

        $http({
            method : 'POST',
            url : './server/supplier-customer/addNewCustomer.php',
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

    $scope.deleteCustomer = (id) => {
        if (confirm("Are you sure!")) {
            let formData = { cId: id };
            let postData = 'myData='+JSON.stringify(formData);
            $http({
                method : 'POST',
                url : './server/supplier-customer/deleteCustomer.php',
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

    $scope.openModalUpdateCustomer = (customer) => {
        $("#updateCustomer").modal()
        $scope.updatedCustomer = customer;
    }

    $scope.updateCustomer = () => {
        if(!$scope.updatedCustomer.c_name || !$scope.updatedCustomer.mob){
            alert('Enter all data')
            return
        }
        $scope.updatedCustomer.address ? $scope.updatedCustomer.address = $scope.updatedCustomer.address : $scope.updatedCustomer.address = ''

        $("#updateCustomer").modal('hide')
        if (confirm("Are you sure!")) {
            $scope.updatedCustomer.c_name.trim();
            $scope.updatedCustomer.c_name = $scope.updatedCustomer.c_name.charAt(0).toUpperCase() + $scope.updatedCustomer.c_name.slice(1);
            let formData = { cId:  $scope.updatedCustomer.c_id, cName:  $scope.updatedCustomer.c_name, mob: $scope.updatedCustomer.mob, address: $scope.updatedCustomer.address };
            let postData = 'myData='+JSON.stringify(formData);
            $http({
                method : 'POST',
                url : './server/supplier-customer/updateCustomer.php',
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

    $("#updateCustomer").on('hidden.bs.modal', function(){
        $route.reload();
    });

})