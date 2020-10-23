var app = angular.module("pendingCreditBillPurchase", ["ngCookies", "datatables"]);
app.controller("pendingCreditBillPurchaseCtrl", function (
  $scope,
  $http,
  $cookies,
  $window,
  $rootScope,
  $routeParams
) {
  !$cookies.get("username") ? (window.location.href = "index.html") : "";

  $rootScope.loader = true;
  $scope.voucher_no = $routeParams.id;

  let formData = { voucherNo: $scope.voucher_no };
  let postData = 'myData='+JSON.stringify(formData);

  let firstRow = ''
        

  $http({
      method : 'POST',
      url : './server/purchase/getPendingCreditBillPurchase.php',
      data: postData,
      headers : {'Content-Type': 'application/x-www-form-urlencoded'}
  }).then((res) => {
      if(res.data){
        $scope.allCredits = res.data;
        firstRow = $scope.allCredits[0];
      }
      else{
          alert('No data available')
      }
      $rootScope.loader = false;

  }).catch((error) => {
      alert('Something went wrong')
      $rootScope.loader = false;
  });

  $scope.addCreditAmount = () => {
    if(!$scope.amount){
      alert('Enter amount')
      return
    }

    if(!$scope.creditDate){
      alert('Enter date')
      return
    }

    let total = 0;
    let totalPaid = 0;
    for (let i = 0; i < $scope.allCredits.length; i++){
      total = total + parseFloat($scope.allCredits[i].paid)
      totalPaid = totalPaid + parseFloat($scope.allCredits[i].paid)
    }

    total = total + $scope.amount;

    totalPaid = totalPaid + $scope.amount; 

    if (total > firstRow.total_amount) {
      alert($scope.amount + ' exceeded total amount ' + firstRow.total_amount)
      return
    }

    let completed = false;

    balance = parseFloat(firstRow.total_amount) - totalPaid;

    if (total == firstRow.total_amount) {
      completed = true;
      balance = 0;
    }

    $scope.creditDate = moment($scope.creditDate).format("YYYY-MM-DD");

    let obj = { 
      voucherNo: firstRow.voucher_no,
      invoiceNo: firstRow.invoice_no,
      creditDate: $scope.creditDate,
      totalAmount: firstRow.total_amount,
      paid: $scope.amount,
      balance: balance,
      completed: completed,
    }

    let formData = obj;
    let postData = 'myData=' + JSON.stringify(formData);
    
    $http({
        method : 'POST',
        url : './server/purchase/addNewCredit.php',
        data: postData,
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then((res) => {
        if(res.data.flag){
          alert('Added Successfully');
          window.location.reload();            
        }
        else{
          alert('Failed, try again!!')
          window.location.reload();
        }
    }).catch((error) => {
        alert('Something went wrong')
    });      
  }

    $scope.deleteTransaction = (index, amount, balance) => {
      if (confirm("Are you sure!")) {

        let formData = { deleteIndex:  index, amount:  amount, voucherNo: $scope.voucher_no, balance: balance};
            let postData = 'myData='+JSON.stringify(formData);
            $http({
                method : 'POST',
                url : './server/purchase/updateTransaction.php',
                data: postData,
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then((res) => {
                if(res.data.flag){
                    alert('Updated Successfully');
                    window.location.reload();
                }
                else{
                    alert('Failed, try again!!')
                    window.location.reload();
                }
            }).catch((error) => {
                alert('Something went wrong' + error)
                $route.reload();
            });

      }
    }
});
