var app = angular.module("allSales", ["ngCookies", "datatables"]);
app.controller("allSalesCtrl", function (
  $scope,
  $http,
  $cookies,
  $route,
  $rootScope
) {
  !$cookies.get("username") ? (window.location.href = "index.html") : "";

  $scope.allSales = [];
  let cId = ''
  $("#cName").autocomplete({
    source: "./server/sales/getAllCustomer.php",
    select: function (event, data) {
       cId = data.item.id;
      //getAllPurchase(cId, "customer");
    },
  });

  $scope.getPurchaseByDate = () => {

     if (!$scope.startDate || !$scope.endDate) {
      alert('Select start and end date')
      return
    }

    let startDate = moment($scope.startDate).format("YYYY-MM-DD");
    let endDate = moment($scope.endDate).format("YYYY-MM-DD");

     if (cId) {
          getAllPurchase(cId, "c", startDate, endDate);
    }
    else if($scope.cName && !cId){
          getAllPurchase("", "c", startDate, endDate);
    }
    else {
          getAllPurchase("", "d", startDate, endDate);
    }
  };

  const getAllPurchase = (id, flag, startDate, endDate) => {
    let formData, postData;

    $scope.allSales = [];
    cId = '';

    
    if (flag == "c") {
      formData = { startDate: startDate, endDate: endDate, flag: flag, cId: id };
      postData = "myData=" + JSON.stringify(formData);
    }
    if (flag == "d") {
      formData = { startDate: startDate, endDate: endDate, flag: flag };
      postData = "myData=" + JSON.stringify(formData);
    }

    $rootScope.loader = true;
    $http({
      method: "POST",
      url: "./server/sales/getAllSales.php",
      data: postData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => {
        if (res.data.length) {
          $scope.allSales = res.data;
          $rootScope.loader = false;
        } else {
          alert("Not Found");
          window.location.reload()
        }
      })
      .catch((error) => {
        alert("Something went wrong");
        $rootScope.loader = false;
        $scope.allSales = [];
      });
  };

  $scope.openModalShowItems = (iNo) => {
    let formData = { iNo: iNo };
    let postData = "myData=" + JSON.stringify(formData);
    $scope.allSalesItems = [];

    $rootScope.loader = true;
    $http({
      method: "POST",
      url: "./server/sales/getSalesItems.php",
      data: postData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => {
        if (res.data.length) {
          $scope.allSalesItems = res.data;
          $("#items").modal();
        } else {
          alert("Not Found");
        }
        $rootScope.loader = false;
      })
      .catch((error) => {
        alert("Something went wrong");
        $rootScope.loader = false;
      });
  };
});
