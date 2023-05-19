let app = angular.module("myApp", []);
const url = "https://api.covidtracking.com/v1/states/current.json";

app.controller("myCtrl", ($scope, $http) => {
  $scope.title = "Stay Home Stay Safe";

  $scope.titleChange = () => {
    $scope.title = "Health is Wealth";
  };

  $scope.prevTitle = () => {
    $scope.title = "Stay Home Stay Safe";
  };

  $scope.changeColor = (paitent) => {
    if (paitent > 100000) {
      $scope.color = "#F45050";
    } else if (paitent > 50000) {
      $scope.color = "#F9D949";
    } else {
      $scope.color = "#47A992";
    }

    return $scope.color;
  };

  //calling api
  $http.get(url).then(
    (response) => {
      $scope.covidData = response.data;
    },
    (error) => {
      console.log(error);
    }
  );

  $scope.showModalData = (data) => {
    //make the data lowercase
    data = data.toLowerCase();
    let state = data;

    const specificUrl = `https://api.covidtracking.com/v1/states/${state}/info.json`;

    $http.get(specificUrl).then(
      (response) => {
        $scope.modalData = response.data;
        console.log($scope.modalData);
      },
      (error) => {
        $scope.modalData = undefined;
        console.log(error);
      }
    );
  };

  $scope.getStateData = () => {
    //calling specific api
    let state = $scope.stateName;
    const specificUrl = `https://api.covidtracking.com/v1/states/${state}/info.json`;

    if (state == "") {
      return;
    }
    $http.get(specificUrl).then(
      (response) => {
        $scope.specificData = response.data;
      },
      (error) => {
        $scope.specificData = undefined;
        console.log(error);
      }
    );
  };
});
