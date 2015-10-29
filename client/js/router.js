app.config(function ($routeProvider) {
  $routeProvider
    .when('/user', {
      templateUrl: 'partials/user.html',
      controller:'shipsController',

    })
     .when('/', {
      templateUrl: 'partials/home.html',
      controller:'shipsController',

    })
    .otherwise({redirectTo: '/home'});
});
