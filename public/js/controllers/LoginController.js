angular.module('wellness.login', [])

.controller('LoginController', function($scope, LoginUser) {
	$scope.user = {};
	$scope.login = function() {
		LoginUser.login($scope.user);
	}
})

.factory('LoginUser', function($http, $window) {
	var login = function(user) {
		return $http({
			method: 'POST',
			url: 'api/login',
			data: user
		});
		// .success(function (data) {
		// 	console.log('made it back to Angular');
		// 	$window.sessionStorage.token = data.token;
		// })
		// .error(function (data) {
  //       // Erase the token if the user fails to log in
  //       delete $window.sessionStorage.token;
  //   });
	};
	return {
		login: login
	};
});