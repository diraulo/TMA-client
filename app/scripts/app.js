'use strict';

/**
 * @ngdoc overview
 * @name tmaClientApp
 * @description
 * # tmaClientApp
 *
 * Main module of the application.
 */

var app = angular.module('tmaClientApp', [
  'ngAnimate',
  'ngCookies',
  'ngRoute',
  'ngResource',
  'ngSanitize',
  'ngTouch',
  'angular-loading-bar',
  'config',
  'angularPayments'
]);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainController'
    })
    .when('/login', {
      templateUrl: 'views/authentication/login.html',
      controller: 'AuthenticationController'
    })
    .when('/register', {
      templateUrl: 'views/authentication/register.html',
      controller: 'AuthenticationController'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutController'
    })
    .when('/menu', {
      templateUrl: 'views/menu.html',
      controller: 'MenuController'
    })
    .when('/cart', {
      templateUrl: 'views/cart.html',
      controller: 'CartController'
    })
    .when('/confirm-order', {
      templateUrl: 'views/confirm-order.html',
      controller: 'OrderController'
    })
    .when('/payment/:id', {
      templateUrl: 'views/payment.html',
      controller: 'PaymentController'
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

//restricted paths that will redirect to '#/login' if not loggedin
app.run(function($rootScope, $location, AuthenticationService) {
  var routePermissions = ['^/confirm-order', '^/payment/']; //regExp paths that require login. eg: ['^/menu']

  $rootScope.$on('$routeChangeStart', function() {
    if ((AuthenticationService.isLoggedIn() === false) &&
        (checkRegExpMatchesString(routePermissions, $location.path()))) {
      $location.path('/login');
    }
  });

});


function checkRegExpMatchesString(regExpArray, string) {
  for (var i = 0; i < regExpArray.length; i++) {
    var routeRegExp = new RegExp(regExpArray[i]);
    if (string.search(routeRegExp) !== -1) {
      return true;
    }
  };
  return false;
}