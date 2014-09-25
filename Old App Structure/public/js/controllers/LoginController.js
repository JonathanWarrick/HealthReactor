angular.module('wellness.login', [])

.controller('LoginController', function($scope, $state, LoginUser) {
	$scope.user = {};
	$scope.login = function() {
		LoginUser.login($scope.user)
		$scope.user.username = '';
		$scope.user.password = '';
		// navigate to points page upon log-in
		$state.go('points');
	}
})

.factory('LoginUser', function($http) {
	var login = function(user) {
		return $http({
			method: 'POST',
			url: 'api/login',
			data: user
		});
	};
	return {
		login: login
	};
});