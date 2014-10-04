// var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');

var db = require('./database.js');
var User = require('../api/user/user.model.js');
var ActivitySubmission = require('../api/activities/activities.model.js');
var Users = require('../api/user/user.collection.js');
var ActivitySubmissions = require('../api/activities/activities.collection.js');

exports.loginUser = function(request, response) {
	var username = request.body.username;
	var password = request.body.password;

	new User({
		username: username,
		password: password
	})
	.fetch()
	.then(function(found) {
		if (found) {
			// create session
			response.send(200);
		} else {
			console.log('This user was not found:', found.username);
		}
	});
};

exports.signupUser = function(request, response) {
	console.log(request);
	var username = request.username;
	var password = request.password;

	new User({
		username: username,
		password: password
	})
	.fetch()
	.then(function(user) {
		if(user) {
			console.log('This user already exists:', user);
			response.send(400);
		} else {
			var newUser = new User({
				username: username,
				password: password
			});
			newUser.save()
			.then(function(user) {
				Users.add(newUser);
				// need to add session functionality here
				console.log('This user was successfully created and saved:', user);
			});
		}
	});
};

exports.submitPoints = function(request, response) {
	console.log(request.body);
	var username = request.body.username;
	var date = new Date();
	var activities = request.body.initiativeArray;

	new ActivitySubmission({
		username: username,
		submissionDate: date,
		waterPoints: activities[0],
		stairsPoints: activities[1],
		yogaPoints: activities[2],
		workoutPoints: activities[3],
		meditationPoints: activities[4],
		walkingPoints: activities[5]
	})
	.fetch()
	.then(function(activitySubmission) {
		if (activitySubmission) {
			console.log('Updating current points for this day and user.');
			// add logic here
		} else {
			var newActivitySubmission = new ActivitySubmission({
				username: username,
				submissionDate: date,
				waterPoints: activities[0],
				stairsPoints: activities[1],
				yogaPoints: activities[2],
				workoutPoints: activities[3],
				meditationPoints: activities[4],
				walkingPoints: activities[5]
			});
			newActivitySubmission.save()
			.then(function(newActivitySubmission) {
				ActivitySubmissions.add(newActivitySubmission);
				console.log('Activity submission added', newActivitySubmission)
			});
		}
	});
};