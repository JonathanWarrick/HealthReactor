'use strict';

angular.module('WellnessApp')
  .config(function($stateProvider) {
  	$stateProvider
	  	.state('pointsTracker', {
	  		url: '/pointsTracker',
	  		templateUrl: 'app/pointsTracker/pointsTracker.html',
	  		controller: 'PointsTrackerController'
	  	});
  });
