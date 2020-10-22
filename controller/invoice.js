var app = angular.module("invoice", ["ngCookies", "datatables"]);
app.controller("invoiceCtrl", function (
  $scope,
  $http,
  $cookies,
  $route,
  $routeParams,
  $rootScope
) {
  !$cookies.get("username") ? (window.location.href = "index.html") : "";

  let invoice = $routeParams.id;
  $rootScope.loader = true;

  var formData = { invoiceNo: invoice };
  var postData = "myData=" + JSON.stringify(formData);
  $http({
    method: "POST",
    url: "./server/invoice/getInvoice.php",
    data: postData,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
    .then((res) => {
      if (res.data.records.length) {
        $scope.bill = res.data.records[0][0];
        $scope.bill.invoice_date = moment($scope.bill.invoice_date).format(
          "DD-MM-YYYY"
        );
        $scope.items = res.data.records[1];
      } else {
        alert("Details not available");
      }
      $rootScope.loader = false;
    })
    .catch((error) => {
      $rootScope.loader = false;
      alert("Something went wrong");
    });
  
    $scope.generatePDF = () => {
      // Choose the element that our invoice is rendered in.
      const element = document.getElementById("invoice");
      // Choose the element and save the PDF for our user.
      html2pdf().from(element).save();
    }
});
