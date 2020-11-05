var app = angular.module("allPurchase", ["ngCookies", "datatables", "datatables.buttons"]);
app.controller("allPurchaseCtrl", function (
  $scope,
  $http,
  $cookies,
  $route,
  $rootScope,
  DTOptionsBuilder
) {
  !$cookies.get("username") ? (window.location.href = "index.html") : "";

   $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withButtons([
                'pdf',
                'excel'
            ])
            .withDOM('<"html5buttons"B>lTtipr');

  $scope.allPurchases = [];
  let sId = '';

  $("#sName").autocomplete({
    source: "./server/purchase/getAllSupplier.php",
    select: function (event, data) {
       sId = data.item.id;
      //getAllPurchase(sId, "supplier");
    },
  });

  $scope.getPurchaseByDate = () => {

    if (!$scope.startDate || !$scope.endDate) {
      alert('Select start and end date')
      return
    }
    let startDate = moment($scope.startDate).format("YYYY-MM-DD");
    let endDate = moment($scope.endDate).format("YYYY-MM-DD");
    if (sId) {
          getAllPurchase(sId, "s", startDate, endDate);
    }
    else if($scope.sName && !sId){
          getAllPurchase("", "s", startDate, endDate);
    }
    else {
          getAllPurchase("", "d", startDate, endDate);
    }
  };

  const getAllPurchase = (id, flag, startDate, endDate) => {
    let formData, postData;

    $scope.allPurchases = [];
    sId = ''

    if (flag == "s") {
      formData = { startDate: startDate, endDate: endDate, flag: flag, sId: id };
      postData = "myData=" + JSON.stringify(formData);
    }
    if (flag == "d") {
      formData = { startDate: startDate, endDate: endDate, flag: flag };
      postData = "myData=" + JSON.stringify(formData);
    }

    $rootScope.loader = true;
    $http({
      method: "POST",
      url: "./server/purchase/getAllPurchase.php",
      data: postData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => {
        if (res.data.length) {
          $scope.allPurchases = res.data;
          $rootScope.loader = false;
        } else {
          alert("Not Found");
          window.location.reload()          
        }
      })
      .catch((error) => {
        alert("Something went wrong");
        $rootScope.loader = false;
        $scope.allPurchases = [];
      });
  };

  $scope.openModalShowItems = (vNo) => {
    let formData = { vNo: vNo };
    let postData = "myData=" + JSON.stringify(formData);
    $scope.allPurchasesItems = [];

    $rootScope.loader = true;
    $http({
      method: "POST",
      url: "./server/purchase/getPurchaseItems.php",
      data: postData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => {
        if (res.data.length) {
          $scope.allPurchasesItems = res.data;
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
