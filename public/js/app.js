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
  var checkLoggedin = ['$q', '$timeout', '$window', '$location', function($q, $timeout, $window, $location) {
    var deferred = $q.defer();
    if ($window.sessionStorage.token) {
      $timeout(deferred.resolve);
    } else {
      $timeout(deferred.reject);
      $location.path('/login');
    }
    return deferred.promise;    
  }]
  $httpProvider.interceptors.push('authInterceptor');
  $routeProvider.when('/view1', {templateUrl: 'partials/view1.html', controller: 'View1Ctrl', resolve: { loggedin: checkLoggedin }});
  $routeProvider.when('/view2', {templateUrl: 'partials/view2.html', controller: 'View2Ctrl', resolve: { loggedin: checkLoggedin }});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
  $routeProvider.otherwise({redirectTo: '/login'});
}])
.run(['$rootScope', '$location', '$window', '$http',
function ($rootScope, $location, $window, $http) {
  $rootScope.logout = function () {
    delete $window.sessionStorage.token;
    $location.path('./login');
  };
}]);
