angular.module('wellness.signup', [])

.controller('SignUpController', function($scope, SignUpUser) {
	$scope.user = {};
	$scope.signup = function() {
		SignUpUser.signup($scope.user);
	}
})

.factory('SignUpUser', function($http) {
	var signup = function(user) {
		return $http({
			method: 'POST',
			url: 'api/signup',
			data: user
		});
	};
	return {
		signup: signup
	}
});