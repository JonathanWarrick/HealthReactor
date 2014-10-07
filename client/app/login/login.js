'use strict';

angular.module('WellnessApp')
  .config(function($stateProvider) {
  	$stateProvider
	  	.state('login', {
	  		url: '/login',
	  		templateUrl: 'app/login/login.html',
	  		controller: 'AuthController'
	  	});
  });
