'use strict';

angular.module('WellnessApp')
  .config(function($stateProvider) {
  	$stateProvider
	  	.state('leaderboard', {
	  		url: '/leaderboard',
	  		templateUrl: 'app/leaderboard/leaderboard.html',
	  		controller: 'LeaderboardController'
	  	});
  });
