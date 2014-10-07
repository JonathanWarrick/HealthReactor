'use strict';

angular.module('WellnessApp')
  .config(function($stateProvider) {
  	$stateProvider
	  	.state('signup', {
	  		url: '/signup',
	  		templateUrl: 'app/signup/signup.html',
	  		controller: 'AuthController'
	  	});
  });
