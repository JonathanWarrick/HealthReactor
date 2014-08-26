// Require modules to use with requestHandler
var User = require('./user.js');

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

module.exports = requestHandler;