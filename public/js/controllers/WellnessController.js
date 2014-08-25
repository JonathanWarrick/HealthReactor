angular.module('wellness', [
	'ui.router', 
	'wellness.points'
])

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	  .state('points', {
	  	url: "/points",
	  	templateUrl: 'public/views/points.html',
	  	controller: "PointsController"
	  });
	$urlRouterProvider.otherwise("/");
})

.controller('WellnessController', function($scope) {
	$scope.test = "This is an angular test.";
});

