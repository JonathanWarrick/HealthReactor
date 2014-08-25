angular.module('wellness', [
	'ui.router', 
	'wellness.points',
	'wellness.login', 
	'wellness.signup'
])

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	  .state('points', {
	  	url: "/points",
	  	templateUrl: 'public/views/points.html',
	  	controller: "PointsController"
	  })
	  .state('login', {
	  	url: "/login",
	  	templateUrl: 'public/views/login.html',
	  	controller: "LoginController"
	  })
	  .state('signup', {
	  	url: "/signup",
	  	templateUrl: 'public/views/signup.html',
	  	controller: "SignUpController"
	  });
	$urlRouterProvider.otherwise("/");
})

.controller('WellnessController', function($scope) {
	$scope.test = "This is an angular test.";
});

