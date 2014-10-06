'use strict';

angular.module('WellnessApp')
  .controller('LoginController', function($scope, $http) {
    $scope.userLogin = function() {
      $http.post('api/auth/login', {
        username: $scope.username,
        password: $scope.password
      }).success(function(data) {
        console.log('user successfully logged in', data);
      }).error(function(err) {
        console.error('error', err);
      });
    };
  });
