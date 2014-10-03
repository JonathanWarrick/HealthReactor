'use strict';

angular.module('WellnessApp')
  .controller('PointsTrackerController', function($scope, Initiatives) {
  	$scope.counterInitiatives = Initiatives.counterInitiatives;
  	$scope.checkInitiatives = Initiatives.checkInitiatives;
  	$scope.totalPoints = 0;
  	$scope.calculateTotalPoints = function() {
  		$scope.totalPoints = 0;
  		$scope.counterInitiatives.forEach(function(initiative) {
  			$scope.totalPoints += initiative.pointTotal;
  		});
  		$scope.checkInitiatives.forEach(function(initiative) {
  			$scope.totalPoints += initiative.pointTotal;
  		});
  	};
  });
  // .directive('initiative', function() {
  // 	return {
  // 		restrict: 'E',
  // 		template: 'Initiative: {{testData.name}} <br/> Points Per: {{testData.pointsPer}} <br/> Checked Off: {{testData.checkOrCounter}} <br/>'
  // 	};
  // });
