// var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');
var jwt = require('jwt-simple');
var Q = require('q');

var db = require('./database.js');
var User = require('../api/user/user.model.js');
var ActivitySubmission = require('../api/activities/activities.model.js');
var Users = require('../api/user/user.collection.js');
var ActivitySubmissions = require('../api/activities/activities.collection.js');

exports.loginUser = function(request, response) {
	console.log('request:', request.body);
	var username = request.body.username;
	var password = request.body.password;

	new User({
		username: username
	})
	.fetch()
	.then(function(user) {
		console.log('user after fetch is', user);
		if (!user) {
			console.log('This user was not found:', user);
			response.send(404);
		} else {
			user.comparePassword(password, function(match) {
				if (match) {
					var token = jwt.encode(user, 'secret');
					response.json({token: token});
				} else {
					console.log('This user was not found:', user);
					response.send(404);
				}
			});
		}
	});
};

exports.signupUser = function(request, response) {
	console.log(request);
	var username = request.body.username;
	var password = request.body.password;

	new User({
		username: username,
		password: password
	})
	.fetch()
	.then(function(user) {
		if(user) {
			console.log('This user already exists:', user);
			response.send(404);
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
				response.send(200, user);
			});
		}
	});
};

exports.checkAuth = function (request, response, next) {
  // checking to see if the user is authenticated
  // grab the token in the header is any
  // then decode the token, which we end up being the user object
  // check to see if that user exists in the database
  var token = request.headers['x-access-token'];
  if (!token) {
    next(new Error('No token'));
  } else {
    var user = exports.decode(token, 'secret');
    var findUser = Q.nbind(User.findOne, User);
    findUser({username: user.username})
      .then(function (foundUser) {
        if (foundUser) {
          res.send(200);
        } else {
          res.send(401);
        }
      })
      .fail(function (error) {
        next(error);
      });
  }
 };

exports.submitPoints = function(request, response) {
	console.log(request.body);
	var username = request.body.username;
	var activities = request.body.initiativeArray;

	var day = new Date();
	var dayWrapper = moment(day); 
	var dayString = dayWrapper.format("YYYY MMM D"); 
	console.log(dayString);

	new ActivitySubmission({
		username: username,
		submissionDate: dayString,
	})
	.fetch()
	.then(function(activitySubmission) {
		if (activitySubmission) {
			console.log('Updating current points for this day and user.', activitySubmission);
			activitySubmission.save({
				waterPoints: activities[0],
				stairsPoints: activities[1],
				yogaPoints: activities[2],
				workoutPoints: activities[3],
				meditationPoints: activities[4],
				walkingPoints: activities[5]			
			}, {patch: true});
		} else {
			var newActivitySubmission = new ActivitySubmission({
				username: username,
				submissionDate: dayString,
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

var errorLogger = function (error, request, response, next) {
  // log the error then send it to the next middleware in
  // middleware.js

  console.error(error.stack);
  next(error);
};

var errorHandler = function (error, request, response, next) {
  // send error message to client
  // message for gracefull error handling on app
  response.send(500, {error: error.message});
};

var decode = function (request, response, next) {
  var token = request.headers['x-access-token'];
  var user;

  if (!token) {
    return response.send(403); // send forbidden if a token is not provided
  }

  try {
    // decode token and attach user to the request
    // for use inside our controllers
    user = jwt.decode(token, 'secret');
    request.user = user;
    next();
  } catch(error) {
    return next(error);
  }

};