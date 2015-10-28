var app = angular.module('myApp', []);

app.controller('shipsController', ['$scope', '$http', function($scope, $http) {

   $scope.addUser = function() {
    var payload = {
      'username': $scope.username
    };
    $http.post('users', payload).then(function(response) {
        console.log(response);
        // $scope.addedEvents = payload.data.events;
      });

  };


  $scope.getUsers = function () {
   $http.get('/users')
    .success(function(data) {
      $scope.users = data;
     console.log(data);
    })
    .error(function(err) {
       console.log(err);
    });
  };


}]);
