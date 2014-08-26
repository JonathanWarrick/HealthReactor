angular.module('wellness.leaderboard', [])

.controller('LeaderboardController', function($scope, Leaderboard) {
	$scope.createLeaderboard = function() {
		$scope.counter = 0;
		Leaderboard.createLeaderboard()
	  .then(function(leaderboard) {
	  	$scope.leaderboard = leaderboard.data;
	  	$scope.leaderboard2 = Leaderboard.populateLeaderboard($scope.leaderboard);
			$scope.leaderboard2.sort(function(a, b) {
				return b.points - a.points;
			});
			for (var i = 0; i < $scope.leaderboard2.length; i++) {
				$scope.leaderboard2[i].counter = i + 1;
			}
	  });
	};
})

.factory('Leaderboard', function($http) {

	var createLeaderboard = function() {
		console.log('called createLeaderboard within factory');
		return $http({
			method: 'GET',
			url: 'api/leaderboard'
		})
		.success(function(response) {
			return response;
		});
	};

	var populateLeaderboard = function(leaderboard) {
		var tempLeaderboard = {};
		leaderboard.forEach(function(record) {
			var user = record.username;
			var points = record.points;
			if (tempLeaderboard[user]) {
				tempLeaderboard[user] += points;
			} else {
				tempLeaderboard[user] = points;
			}
		});
		console.log('templeaders', tempLeaderboard);
		var newLeaderboard = [];
		for (var key in tempLeaderboard) {
			// console.log(key);
			newLeaderboard.push({
				username: key,
				points: tempLeaderboard[key]
			});
		}
		console.log('newleaders', newLeaderboard);
		return newLeaderboard;
	};

	return {
		populateLeaderboard: populateLeaderboard,
		createLeaderboard: createLeaderboard
	};
});