'use strict';

angular.module('WellnessApp')
  .controller('PointsTrackerController', function($scope) {
  	$scope.testData = {
  		name: 'thingy',
  		pointsPer: 10,
  		checkOrCounter: 'check'
  	};
  })
  .directive('initiative', function() {
  	return {
  		restrict: 'E',
  		template: 'Initiative: {{testData.name}} <br/> Points Per: {{testData.pointsPer}} <br/> Checked Off: {{testData.checkOrCounter}} <br/>'
  	};
  });
