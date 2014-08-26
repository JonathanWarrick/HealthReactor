angular.module('wellness.signup', [])

.controller('SignUpController', function($scope, $state,SignUpUser) {
	$scope.user = {};
	$scope.signup = function() {
		SignUpUser.signup($scope.user);
		$scope.user.username = '';
		$scope.user.password = '';
		// navigate to points page upon sign-up (implied log-in)
		$state.go('points');
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