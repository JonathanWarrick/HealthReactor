angular.module('wellness', ['ui.router'])

// .config(function($stateProvider, urlRouterProvider) {
// 	$stateProvider
// 	  .state('points', {
// 	  	url: "/points",
// 	  	templateUrl: "../views/points.html"
// 	  });
// 	$urlRouterProvider.otherwise("../index.html");
// })

.controller('WellnessController', function($scope) {
	$scope.test = "This is an angular test.";
});

