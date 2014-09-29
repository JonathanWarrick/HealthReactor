'use strict';

angular.module('WellnessApp')
  .controller('MainController', function($scope) {
    $scope.field1 = {
      name: 'Username'
    };
    $scope.field2 = {
        name: 'Password'
      };
  })
  .directive('ig', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        fid: '@',
        fieldInfo: '=info'
      },
      template: 
        '<material-input-group>' +
          '<label for="{{fid}}">{{fieldInfo.name}}</label>' +
          '<material-input id="{{fid}}" type="text" ng-model="data.description">' +
        '</material-input-group>'
    };
  });
