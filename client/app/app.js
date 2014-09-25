angular.module('WellnessApp', [
	'ui.router'
])
.config(function($urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
})