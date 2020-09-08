var app = angular.module("company", ["ngCookies", "datatables"]);
app.controller("companyCtrl", function ($scope, $http, $cookies, $route) {
  !$cookies.get("username") ? (window.location.href = "index.html") : "";

  $scope.company = "";
  $scope.show = false;
  $http
    .get("./server/company/getCompanyDetails.php")
    .then((res) => {
      if (res.data.records.length) {
        $scope.company = res.data.records;
        $scope.show = true;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  $scope.addCompany = () => {
    if (!$scope.companyName) {
      alert("Enter company name");
      return;
    }
    if (!$scope.place) {
      alert("Enter place");
      return;
    }
    if (!$scope.gst) {
      alert("Enter GST No");
      return;
    }

    let formData = {
      companyName: $scope.companyName,
      mob: $scope.mob,
      landPhone: $scope.landPhone,
      gst: $scope.gst,
      address1: $scope.address1,
      address2: $scope.address2,
      place: $scope.place,
      pin: $scope.pin,
    };

    let postData = "myData=" + JSON.stringify(formData);

    $http({
      method: "POST",
      url: "./server/company/addCompany.php",
      data: postData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => {
        if (res.data.flag) {
          alert("Added Successfully");
          $route.reload();
        } else {
          alert("Failed, try again!!");
          $route.reload();
        }
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };
});
