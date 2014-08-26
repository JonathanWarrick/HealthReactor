angular.module('wellness.leaderboard', [])

.controller('LeaderboardController', function($scope, Leaderboard) {
	$scope.createLeaderboard = function() {
		Leaderboard.createLeaderboard()
	  .then(function(response) {
	  	$scope.leaderboard = response.data;
	  	$scope.leaderboard.sort(function(a, b) {
	  		return b.points - a.points;
	  	});
	  	console.log($scope.leaderboard);
	  });
		// console.log('createLeaderboard called within controller')
		// Leaderboard.createLeaderboard();
		// setTimeout(function() {
		// 	$scope.leaderboard = Leaderboard.leaderboard;
		// 	$scope.leaderboard.sort(function(a, b) {
		// 		return b.points - a.points;
		// 	});
		// 	console.log($scope.leaderboard);
		// }, 5000);
	};
})

.factory('Leaderboard', function($http) {
	var leaderboard = [];
	var createLeaderboard = function() {
		console.log('called createLeaderboard within factory');
		return $http({
			method: 'GET',
			url: 'api/leaderboard'
		})
		.success(function(response) {
			console.log(response);
			return response;
		});
	};

	return {
		leaderboard: leaderboard,
		createLeaderboard: createLeaderboard
	};
});