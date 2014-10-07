'use strict';

// require Express to handle server routing, calls, etc.
var express = require('express');

// require Mongoose to handle database querying
// var mongoose = require('mongoose');

// configure database
var configDB = require('./config/database.js');
var helpers = require('./config/request-handlers.js');

// connect to database
// mongoose.connect(configDB.url);

// require Body Parser to automatically parse request body
var bodyParser = require('body-parser');

// create app using an Express instance
var app = express();

// establish port, either using environmental variable or default static port value
var port = process.env.PORT || 7777;

// configure Body Parser
// Returns middleware that only parses urlencoded bodies. This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser());

// app.use(helpers.errorLogger);
// app.use(helpers.errorHandler);

// configure static path for index.html
app.use(express.static(__dirname + '../../client')); // dirname is '/server' right now

// feed routes to server
// require('./routes.js')(app);

app.post('/api/submitPoints', helpers.submitPoints);
app.post('/api/auth/login', helpers.loginUser);
app.post('/api/auth/signup', helpers.signupUser);
app.get('/api/auth/signout', helpers.checkAuth)

// open connection to port
app.listen(port);
console.log('Server running on port %d', port);

exports = module.exports = app;

// var test = function() {
// 	helpers.signupUser({
// 		username: 'testUser', 
// 		password: 'testPassword'
// 	});
// }();

// using MySQL
// mysql.server stop (stop existing running instances)
// mysql.server start
// mysql -u root -p
// use healthreactordbdev;
