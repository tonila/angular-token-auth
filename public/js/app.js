'use strict';

var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]);

myApp
.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
  $routeProvider.when('/view1', {templateUrl: 'partials/view1.html', controller: 'View1Ctrl'});
  $routeProvider.when('/view2', {templateUrl: 'partials/view2.html', controller: 'View2Ctrl'});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
  $routeProvider.otherwise({redirectTo: '/login'});
}])
.run(['$rootScope', '$location', '$window', '$http',
function ($rootScope, $location, $window, $http) {
  $rootScope.logout = function () {
    //$scope.welcome = '';
    //$scope.message = '';
    $rootScope.isAuthenticated = false;
    delete $window.sessionStorage.token;
    $location.path('./login');
  };
}]);
