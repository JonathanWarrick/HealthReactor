// Require modules to use with requestHandler
var User = require('./user.js');
var Submission = require('./initiativeSubmission.js');
// var jwt = require('jsonwebtoken');

// Require Cookie Parser and Express-Session to handle sessions
// var session = require('express-session');
// var cookieParser = require('cookie-parser');

// Create empty requestHandler object to be extended and later sent for requests
var requestHandler = {};

requestHandler.signup = function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	var newUser = new User({username: username, password: password});
	newUser.save(function(err, user) {
		if (err) {
			console.error(err);
		}
		console.log('user saved');	
	});
};

requestHandler.login = function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	var newUser = new User({username: username, password: password});
	User.findOne({username: username, password: password}, function(err, user) {
		if (err) {
			console.error(err);
		}
		if (user) {
			console.log('user found');	
			// var token = jwt.sign(user, secret, {expiresInMinutes: 60 * 5});
			// response.json({token: token});
		} else {
			console.log('user not found');
			return false;
		}
	});
};

requestHandler.submitPoints = function(request, response) {
	console.log('submit points called');
	var username = request.body.username;
	var points = request.body.points;
	var newSubmission = new Submission({
		username: username,
		points: points
	});
	newSubmission.save(function(err, submission) {
		if (err) {
			console.error(err);
		}
		console.log('submission saved');
	});
};

requestHandler.createLeaderboard = function(request, response) {
	console.log('createLeaderboard called in request handlers');
	var users = Submission.find(function(err, submissions) {
		if (err) {
			console.error(err);
		}
		if(submissions) {
			console.log(submissions);
		}
		response.send(200, submissions);
	});
};

requestHandler.getPoints = function(request, response) {
	console.log('getPoints called');
	var date = request.body.name;
	console.log('request.body', request.body);
	console.log('date', date);

	Submission.find({date: date, username: 'demoUser'}, function(err, results) {
		if (err) {
			console.error(err);
		}
		if (results) {
			console.log('here are the results', results);
		}
		response.send(200, results);
	});
}

// Create new sessions upon successful user log-in
// requestHandler.createSession = function(request, response, user) {
// 	console.log(request.session);
// 	return request.session.regenerate(function() {
// 		request.session.user = user;
// 		console.log('successfully logged in and created session:', request.session);
// 	});
// };

module.exports = requestHandler;