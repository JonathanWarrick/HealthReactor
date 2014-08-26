angular.module('wellness.login', [])

.controller('LoginController', function($scope, LoginUser) {
	$scope.user = {};
	$scope.login = function() {
		LoginUser.login($scope.user);
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