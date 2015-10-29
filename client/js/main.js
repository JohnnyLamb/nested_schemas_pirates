var app = angular.module('myApp', ['ngRoute', 'ngResource']);

app.controller('shipsController', ['$scope', '$http', '$location','getIdService', function($scope, $http, $location,getIdService) {

  $scope.addUser = function() {
    var payload = {
      'username': $scope.username
    };
    $http.post('users', payload).then(function(response) {
      console.log(response);
      // $scope.addedEvents = payload.data.events;
    });

  };



  // get all users
  $scope.getUsers = function() {
    $http.get('/users/ships')
      .success(function(data) {
        $scope.users = data;
        // $scope.ships = data.ships;
        // console.log(data);
      })
      .error(function(err) {
        console.log(err);
      });
  };



  $scope.addShip = function() {

    console.log(getIdService.id);
    var id = getIdService.id;
    var payload = {
      'name': $scope.name,
      'missions': $scope.missions
    };
    $http.put('users/' + id + '/ships', payload).then(function(response) {
      console.log(response);
      // $location.path(response);
      // $scope.addedEvents = payload.data.events;
    });

  };

  //get single users

  $scope.getSingleUserId = function(data) {
    console.log(data._id);
    getIdService.id = data._id;
    // $http.get('/users/ships')
    //  .success(function(data) {
    //    $scope.users = data;
    //    // $scope.ships = data.ships;
    //   console.log(data);
    //  })
    //  .error(function(err) {
    //     console.log(err);
    //  });
  };


}]);
