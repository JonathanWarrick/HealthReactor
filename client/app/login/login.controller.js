// 'use strict';

// angular.module('WellnessApp')
//   .controller('LoginController', function($scope, $http, $state, $window, Auth) {
//     $scope.userLogin = function() {
//       Auth.login({
//         username: $scope.username,
//         password: $scope.password
//       })
//       .then(function (token) {
//         $window.localStorage.setItem('healthreactor', token);
//         $state.go('pointsTracker');
//       })
//       .catch(function (error) {
//         console.error(error);
//       });
//     };
//   });