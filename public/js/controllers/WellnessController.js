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
	  	templateUrl: '/views/points.html',
	  	controller: "PointsController"
	  })
	  .state('login', {
	  	url: "/login",
	  	templateUrl: '/views/login.html',
	  	controller: "LoginController"
	  })
	  .state('signup', {
	  	url: "/signup",
	  	templateUrl: '/views/signup.html',
	  	controller: "SignUpController"
	  });
	$urlRouterProvider.otherwise("/");
})

.controller('WellnessController', function($scope) {
});

