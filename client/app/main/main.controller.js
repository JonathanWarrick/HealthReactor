'use strict';

angular.module('WellnessApp')
  .controller('MainController', function($scope, $http) {
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
  // .directive('ngTest', function() {
  //   return {
  //     restrict: 'E',
  //     // replace: true,
  //     scope: {
  //       textInput: '=ngModel'
  //     },
  //     template: 
  //       '<input type="text" ng-model="textInput">Enter Info</input>'
  //   };
  // });
  // .directive('myDirective', function() {
  //   return {
  //     restrict: 'E',
  //     replace: true, // removes "my-directive" tag from HTML document
  //     template: '<a href="http://google.com">Click me to go to Google</a>'
  //   };
  // });
//   .directive('myDirective', function() {
// return {
//   restrict: 'A',
//   replace: true,
//   scope: {
//     myUrl: '=someAttr', // MODIFIED
//     myLinkText: '@'
//   },
//   template: '\
//     <div>\
//     <label>My Url Field:</label>\
//     <input type="text"\
//     ng-model="myUrl" />\
//     <a href="{{myUrl}}">{{myLinkText}}</a>\
//     </div>\
//   '
//   }
// });
