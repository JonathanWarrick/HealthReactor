angular.module('WellnessApp')
  .controller('MainController', function($scope) {
  	$scope.data = {
  		t: 'username'
  	};
  })
  .directive('ig', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        fid: '@'
      },
      template: 
        '<material-input-group>' +
          '<label for="{{fid}}">Username</label>' +
          '<material-input id="{{fid}}" type="text" ng-model="data.description">' +
        '</material-input-group>'
    };
  });