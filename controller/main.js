var app = angular
  .module("myApp", [
    "ngCookies",
    "ngRoute",
    "dashboard",
    "brands",
    "units",
    "items",
    "newPurchase",
    "supplier",
    "customer",
    "priceDetails",
    "allPurchase",
    "allStock",
    "company",
    "newSales",
    "invoice",
    "reprint",
    "allSales",
    'allCreditBillsPurchase',
    'pendingCreditBillsPurchase',
    'pendingCreditBillPurchase',
    'allCreditBillsSales',
    'pendingCreditBillsSales',
    'pendingCreditBillSales',
    'purchaseReturn',
    'salesReturn'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "pages/dashboard.html",
        controller: "dashboardCtrl",
      })
      .when("/dashboard", {
        templateUrl: "pages/dashboard.html",
        controller: "dashboardCtrl",
      })
      .when("/brands", {
        templateUrl: "pages/brands.html",
        controller: "brandCtrl",
      })
      .when("/units", {
        templateUrl: "pages/units.html",
        controller: "unitCtrl",
      })
      .when("/items", {
        templateUrl: "pages/items.html",
        controller: "itemCtrl",
      })
      .when("/supplier", {
        templateUrl: "pages/supplier.html",
        controller: "supplierCtrl",
      })
      .when("/customer", {
        templateUrl: "pages/customer.html",
        controller: "customerCtrl",
      })
      .when("/newPurchase", {
        templateUrl: "pages/newPurchase.html",
        controller: "newPurchaseCtrl",
      })
      .when("/priceDetails", {
        templateUrl: "pages/priceDetails.html",
        controller: "priceDetailsCtrl",
      })
      .when("/allPurchase", {
        templateUrl: "pages/allPurchase.html",
        controller: "allPurchaseCtrl",
      })
      .when("/allStock", {
        templateUrl: "pages/allStock.html",
        controller: "allStockCtrl",
      })
      .when("/company", {
        templateUrl: "pages/company.html",
        controller: "companyCtrl",
      })
      .when("/newSale", {
        templateUrl: "pages/newSales.html",
        controller: "newSalesCtrl",
      })
      .when("/invoice/:id", {
        templateUrl: "pages/invoice.html",
        controller: "invoiceCtrl",
      })
      .when("/reprint", {
        templateUrl: "pages/reprint.html",
        controller: "reprintCtrl",
      })
      .when("/allSales", {
        templateUrl: "pages/allSales.html",
        controller: "allSalesCtrl",
      })
      .when("/allCreditBillsPurchase", {
        templateUrl: "pages/allCreditBillsPurchase.html",
        controller: "allCreditBillsPurchaseCtrl",
      })
      .when("/pendingCreditBillsPurchase", {
        templateUrl: "pages/pendingCreditBillsPurchase.html",
        controller: "pendingCreditBillsPurchaseCtrl",
      })
      .when("/pendingCreditBillPurchase/:id", {
        templateUrl: "pages/pendingCreditBillPurchase.html",
        controller: "pendingCreditBillPurchaseCtrl",
      })
     .when("/allCreditBillsSales", {
        templateUrl: "pages/allCreditBillsSales.html",
        controller: "allCreditBillsSalesCtrl",
     })
    .when("/pendingCreditBillsSales", {
        templateUrl: "pages/pendingCreditBillsSales.html",
        controller: "pendingCreditBillsSalesCtrl",
    })
    .when("/pendingCreditBillSales/:id", {
        templateUrl: "pages/pendingCreditBillSales.html",
        controller: "pendingCreditBillSalesCtrl",
    })
    .when("/purchaseReturn", {
        templateUrl: "pages/purchaseReturn.html",
        controller: "purchaseReturnCtrl",
    })
    .when("/salesReturn", {
        templateUrl: "pages/salesReturn.html",
        controller: "salesReturnCtrl",
    })
  });
app.run(function ($rootScope, $cookies, $window, $route, $http) {
  $rootScope.loginUser = $cookies.get("username");
  $rootScope.loader = false;

  $http
    .get("./server/company/getCompanyDetails.php")
    .then((res) => {
      if (res.data.records.length) {
        $rootScope.company = res.data.records[0];
      }
    })
    .catch((error) => {
      console.log(error);
    });

  $rootScope.d = moment().format("DD/MM/YYYY");
  $rootScope.d1 = new Date()
  $rootScope.t = moment().format("h:mm:ss a");

  setInterval(() => {
    $rootScope.$applyAsync(() => {
      $rootScope.t = moment().format("h:mm:ss a");
    });
  }, 1000);

  $rootScope.logout = () => {
    $cookies.remove("username");
    $window.location.href = "index.html";
  };

  $rootScope.backup = () => {
    $rootScope.loader = true;
    $http
      .get("./server/backup/backup.php")
      .then((res) => {
        alert('Success, Stored at "wamp/www/startup/server/backup"')
        window.location.reload();
      })
      .catch((error) => {
        alert('Error, Try again')
      });
  };  

  $rootScope.clearData = () => {
    let code = prompt("Only for admins. Enter code to proceed!");
    if (code == 'admin123') {
        $rootScope.loader = true;
    $http
      .get("./server/backup/clear.php")
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        alert('Error, Try again')
         window.location.reload();
      });

    }else{
      alert('Wrong code')
    }
  }

  let postData = 'myData='+JSON.stringify({year: new Date().getFullYear(), month: new Date().getMonth() + 1});
  $http({
      method : 'POST',
      url : './server/error/getError.php',
      data: postData,
      headers : {'Content-Type': 'application/x-www-form-urlencoded'}
  }).then((res) => {
      if(res.data){
          $rootScope.loader = true;
      }
      else{
          $rootScope.loader = false;
      }
  }).catch((error) => {
      $rootScope.loader = false;
  });

});
