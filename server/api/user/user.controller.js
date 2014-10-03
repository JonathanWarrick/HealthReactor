'use strict';

var User = require('./user.model.js');

// create new user
exports.createNewUser = function(request, response) {
	var date = new Date();
	var newUser = new User({
		username: request.username,
		password: request.password,
		pointsSubmission: {date: {}}
	});

	newUser.save(function(err) {
		if (err) {
			console.error(err);
		} else {
			// response.send(200);	
		}
	});
};

// update points total
exports.updatePointsTotal = function(request, response) {
	console.log(request.body);
	var date = new Date();
	console.log('date is', date);
	var query = {username: request.body.username};
	var update = {
		pointsSumbmission: {
			date: {
				waterInitiative: request.body.initiativeArray[0],
				stairsInitiative: request.body.initiativeArray[1],
				yogaInitiative: request.body.initiativeArray[2],
				workoutInitiative: request.body.initiativeArray[3],
				meditationInitiative: request.body.initiativeArray[4],
				walkingInitiative: request.body.initiativeArray[5]
			}
		} 
	};
	var options = true;

	User.findOneAndUpdate(query, update, options, function(err, user) {
		if (err) {
			console.error('user does not exist', err);
		} else {
			console.log('user updated!', user);
		}
	});

	response.send(200);
};