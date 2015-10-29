var app = angular.module('myApp', ['ngRoute', 'ngResource']);

app.controller('shipsController', ['$scope', '$http', '$location','getIdService', function($scope, $http, $location,getIdService) {

  $scope.addUser = function() {
    var payload = {
      'username': $scope.username
    };
    $http.post('/users', payload).then(function(response) {
      console.log(response);
      // $scope.addedEvents = payload.data.events;
    });

  };



  // get all users
  $scope.getUsers = function() {
    $http.get('/users')
      .success(function(data) {
        $scope.users = data;

        console.log(data);
      })
      .error(function(err) {
        console.log(err);
      });
  };



  $scope.addShip = function() {

    console.log(getIdService.id);
    var id = getIdService.id;
    var payload = {
      'name': $scope.shipname,
      'missions': $scope.shipmissions
    };
    console.log(payload);
    $http.put('/users/' + id + '/ships', payload).then(function(response) {
      console.log(response.data);

      $scope.addedShips = response.data.ships;
    });

  };

  //get single user id
  $scope.getSingleUserId = function(data) {
    getIdService.id = data._id;
  };


}]);
