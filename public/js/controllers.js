'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('LoginCtrl',['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
  $scope.user = {username: 'john.doe', password: 'foobar'};
  $scope.welcome = '';
  $scope.message = '';

  $scope.login = function () {
    $http
      .post('/authenticate', $scope.user)
      .success(function (data, status, headers, config) {
        console.log(data);
        $window.sessionStorage.token = data.token;
        //initial location
        $location.path('/view1');
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        delete $window.sessionStorage.token;

        // Handle login errors here
        $scope.error = 'Error: Invalid user or password';
        $scope.welcome = '';
      });
  };
}])
.controller('View1Ctrl',['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    $scope.message = 'Data will bee loaded after 2 sec...';
    $timeout(function() {
        $http({url: '/api/view1', method: 'GET'})
        .success(function (data, status, headers, config) {
          $scope.message = data.name; // Should log 'foo'
        })
        .error(function (data, status, headers, config) {
          alert(data);
        });
    }, 2000);
}])
.controller('View2Ctrl',['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    $scope.message = 'Data will bee loaded after 3 sec...';
    $timeout(function() {
        $http({url: '/api/view2', method: 'GET'})
        .success(function (data, status, headers, config) {
          $scope.message = data.name; // Should log 'foo'
        })
        .error(function (data, status, headers, config) {
          alert(data);
        });
    }, 3000);
}]);
