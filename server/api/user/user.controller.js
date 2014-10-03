'use strict';

var User = require('./user.model.js');

// create new user
exports.createNewUser = function(request, response) {
	var date = new Date();
	var newUser = new User({
		username: request.username,
		password: request.password,
		pointsSubmissions: []
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
	var date = new Date();
	User.update({
		username: request.body.username,
	},
	{
		$push: {
			"pointsSubmissions": {
				"date": date,
				"waterInitiative": request.body.initiativeArray[0],
				"stairsInitiative": request.body.initiativeArray[1],
				"yogaInitiative": request.body.initiativeArray[2],
				"workoutInitiative": request.body.initiativeArray[3],
				"meditationInitiative": request.body.initiativeArray[4],
				"walkingInitiative": request.body.initiativeArray[5]
			}
		}
	});
	// response.send(200);
};