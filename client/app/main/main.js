'use strict';

angular.module('WellnessApp')
  .config(function($stateProvider) {
  	$stateProvider
	  	.state('main', {
	  		url: '/main',
	  		templateUrl: 'app/main/main.html',
	  		controller: 'MainController'
	  	});
  });
