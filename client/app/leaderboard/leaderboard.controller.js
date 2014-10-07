'use strict';

angular.module('WellnessApp')
  .controller('LeaderboardController', function($scope, $http) {
  	$scope.leaders = [];
  	$scope.getLeaders = function() {
  		$http.get('/api/getLeaders')
  	  .success(function(leaders) {
  	  	$scope.leaders = leaders;
  	  	console.log('received submissions from leaders', leaders);
  	  })
  	  .error(function(error) {
  	  	console.error('You received an error', error);
  	  });
  	};
  	$scope.getLeaders();
  });
