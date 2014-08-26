// Require Express and Middleware to handle request/response
var express    = require('express');
var bodyParser = require('body-parser');

// Require Cookie Parser and Express-Session to handle sessions
// var session = require('express-session');
// var cookieParser = require('cookie-parser');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

// Require request-handler.js to execute functions upon various HTTP requests
var requestHandler = require('./app/request-handler.js');

// Require Mongoose to serve as ORM with MongoDB; connect to MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/healthreactordb');

// Show connection to database
mongoose.connection.once('open', function() {
	console.log("Connected to the database"); 
});

// Instantiate Express
var app = express();

// Determine port (production or development)
var port = process.env.PORT || 7432;

// Configure bodyParser to take-in stringified JSON and parse automatically
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// Enable app to use tokens
// app.use(cookieParser('secret session'));
// app.use(session());
// We are going to protect /api routes with JWT
// app.use('/api', expressJwt({secret: 'secret'}));

// Set the static files location to serve initial request for page
app.use(express.static(__dirname + '/public')); 

// Handle request for new user to sign-up
app.post('/api/signup', function(request, response) {
	requestHandler.signup(request, response);
});

// Handle request for existing user to log-in
app.post('/api/login', function(request, response) {
	requestHandler.login(request, response);
});

// Handle request for daily points submission
app.post('/api/submitPoints', function(request, response) {
	requestHandler.submitPoints(request, response);
});

// Open connection to server
app.listen(port);
console.log("Now listening on:", port);
module.exports = app;