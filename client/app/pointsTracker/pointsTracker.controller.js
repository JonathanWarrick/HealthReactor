'use strict';

angular.module('WellnessApp')
  .controller('PointsTrackerController', function($scope, Initiatives) {
  	$scope.initiatives = Initiatives.initiatives;
  });
  // .directive('initiative', function() {
  // 	return {
  // 		restrict: 'E',
  // 		template: 'Initiative: {{testData.name}} <br/> Points Per: {{testData.pointsPer}} <br/> Checked Off: {{testData.checkOrCounter}} <br/>'
  // 	};
  // });
