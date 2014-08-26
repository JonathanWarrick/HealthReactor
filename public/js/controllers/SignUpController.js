angular.module('wellness.signup', [])

.controller('SignUpController', function($scope, SignUpUser) {
	$scope.user = {};
	$scope.signup = function() {
		console.log('user:', $scope.user.username);
		console.log('pw:', $scope.user.password);
		SignUpUser.signup($scope.user);
	}
})

.factory('SignUpUser', function($http) {
	var signup = function(user) {
		console.log('signup in angular controller!');
		console.log(user);
		return $http({
			method: 'POST',
			url: 'api/signup',
			data: user
		});
	};
	console.log(signup);

	return {
		signup: signup
	}
});