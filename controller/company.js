var app = angular.module("company", ["ngCookies", "datatables"]);
app.controller("companyCtrl", function ($scope, $http, $cookies, $route) {
  !$cookies.get("username") ? (window.location.href = "index.html") : "";

  $http
    .get("./server/company/getCompanyDetails.php")
    .then((res) => {
      if (res.data.records.length) {
        let company = res.data.records[0];

        $scope.companyName = company.company_name;
        $scope.mob = company.mob;
        $scope.landPhone = company.land_phone;
        $scope.email = company.email;
        $scope.gst = company.gst_no;
        $scope.address1 = company.address1;
        $scope.address2 = company.address2;
        $scope.place = company.place;
        $scope.pin = company.pin;
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
      companyName:
        $scope.companyName.charAt(0).toUpperCase() +
        $scope.companyName.slice(1),
      mob: $scope.mob ? $scope.mob : "",
      landPhone: $scope.landPhone ? $scope.landPhone : "",
      email: $scope.email ? $scope.email : "",
      gst: $scope.gst,
      address1: $scope.address1 ? $scope.address1 : "",
      address2: $scope.address2 ? $scope.address2 : "",
      place: $scope.place,
      pin: $scope.pin ? $scope.pin : "",
    };

    console.log(formData);

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
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong");
      });
  };
});
