'use strict';

angular.module('WellnessApp')
  .controller('SignupController', function($scope, $http, $state) {
    $scope.userSignup = function() {
      $http.post('api/auth/signup', {
        username: $scope.username,
        password: $scope.password
      }).success(function(data) {
        console.log('user successfully logged in', data);
        $state.go('pointsTracker');
      }).error(function(err) {
        console.error('error', err);
      });
    };
  });
