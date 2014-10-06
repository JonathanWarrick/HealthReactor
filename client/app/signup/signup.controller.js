'use strict';

angular.module('WellnessApp')
  .controller('SignupController', function($scope, $http) {
    $scope.userSignup = function() {
      $http.post('api/auth/signup', {
        username: $scope.username,
        password: $scope.password
      }).success(function(data) {
        console.log('user successfully logged in', data);
      }).error(function(err) {
        console.error('error', err);
      });
    };
  });
