angular.module('wellness', [
	'ui.router', 
	'wellness.points',
	'wellness.login', 
	'wellness.signup',
	'wellness.leaderboard'
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
	  })
	 .state('leaderboard', {
	  	url: "/leaderboard",
	  	templateUrl: '/views/leaderboard.html',
	  	controller: "LeaderboardController"
	  })
	 .state('calendar', {
	  	url: "/calendar",
	  	templateUrl: '/views/calendar.html',
	  	controller: "CalendarController"
	  });
	$urlRouterProvider.otherwise("/");
})

.controller('WellnessController', function($scope) {
});

