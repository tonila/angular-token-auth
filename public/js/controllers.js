'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('LoginCtrl',['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
  $scope.user = {username: 'john.doe', password: 'foobar'};
  $scope.isAuthenticated = false;
  $scope.welcome = '';
  $scope.message = '';

  $scope.login = function () {
    $http
      .post('/authenticate', $scope.user)
      .success(function (data, status, headers, config) {
        $window.sessionStorage.token = data.token;
        $scope.isAuthenticated = true;
        //var encodedProfile = data.token.split('.')[1];
        //var profile = JSON.parse(url_base64_decode(encodedProfile));
        //$scope.welcome = 'Welcome ' + profile.first_name + ' ' + profile.last_name;
        $location.path('/view1');
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        delete $window.sessionStorage.token;
        $scope.isAuthenticated = false;

        // Handle login errors here
        $scope.error = 'Error: Invalid user or password';
        $scope.welcome = '';
      });
  };
}])
.controller('View1Ctrl',['$scope', '$http', function ($scope, $http) {
    $http({url: '/api/view1', method: 'GET'})
    .success(function (data, status, headers, config) {
      $scope.message = data.name; // Should log 'foo'
    })
    .error(function (data, status, headers, config) {
      alert(data);
    });
}])
.controller('View2Ctrl',['$scope', '$http', function ($scope, $http) {
    $http({url: '/api/view2', method: 'GET'})
    .success(function (data, status, headers, config) {
      $scope.message = data.name; // Should log 'foo'
    })
    .error(function (data, status, headers, config) {
      alert(data);
    });
}]);

//this is used to parse the profile
function url_base64_decode(str) {
  var output = str.replace('-', '+').replace('_', '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw 'Illegal base64url string!';
  }
  return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
}
