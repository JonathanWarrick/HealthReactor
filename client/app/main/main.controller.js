'use strict';

angular.module('WellnessApp')
  .controller('MainController', function($scope) {
    $scope.sendUserData = function() {
      console.log('user is', $scope.username);
      console.log('password is', $scope.password);
    };
  });
  // .directive('ngTest', function() {
  //   return {
  //     restrict: 'E',
  //     // replace: true,
  //     scope: {
  //       textInput: '='
  //     },
  //     template: 
  //       '<input type="text" ng-model="textInput">Enter Info</input>'
  //   };
  // });
