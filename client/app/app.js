angular.module('WellnessApp', [
	'ui.router',
	'ngAnimate',
	'ngMaterial'
])
.config(function($urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
})