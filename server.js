var express    = require('express');
var bodyParser = require('body-parser');

var app = express()
var mongoose = require('mongoose');

// var db = require('./config/config.js');

mongoose.connect('mongodb://localhost/healthreactordb');

var db = mongoose.connection;

// create the user schema for new users
var UserSchema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true}
});

// define user model (mongoose models are equivalent of collections, so users file is irrelevant)
var User = mongoose.model('User', UserSchema);

db.once('open', function() {
	console.log("Connected to the database"); 
});

var port = process.env.PORT || 7432;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

app.get('/', function(request, response) {
	response.sendfile('./public');
	// response.send('test');
});

app.post('/api/signup', function(request, response) {
	console.log('made it in signup on express side');
	console.log(request.body);
	var username = request.body.username;
	var password = request.body.password;
	var newUser = new User({username: username, password: password});
	newUser.save(function(err, user) {
		if (err) {
			console.error(err);
		}
		console.log('user saved:', user);
		response.send('yay');
	});
});


app.listen(port);
console.log("Now listening on:", port);
module.exports = app;




// var createUser = function(user) {
// 	console.log()
// }

// // create the user schema for new users
// var UserSchema = new mongoose.Schema({
//   username: { type: String, required: true, index: { unique: true } },
//   password: { type: String, required: true}
// });

// // define user model (mongoose models are equivalent of collections, so users file is irrelevant)
// var User = mongoose.model('User', UserSchema);

// export for use in handler functions
// module.exports = User;