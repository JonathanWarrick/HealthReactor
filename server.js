var express = require('express');
var app = express();
var mongoose = require('mongoose');
// var bodyParser = require('bodyParser');

// var db = require('./config/config.js');

mongoose.connect('mongodb://localhost/healthreactordb');

var db = mongoose.connection;

db.once('open', function() {
	console.log("Connected to the database"); 
});

var port = process.env.PORT || 7432;

// app.use(bodyParser.json()); // parse application/json 
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// require('./app/routes')(app); // configure our routes


app.get('/points', function(request, response) {
	response.send('test');
});

app.get('*', function(request, response) {
	response.sendfile('./public');
	// response.send('test');
});


app.listen(port);
console.log("Now listening on:", port);
module.exports = app;