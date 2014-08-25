// CONFIGURE SERVER HERE
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/healthreactordb');

var db = mongoose.connection;

db.once('open', function() {
	console.log("Connected to the database"); 
});

module.exports = db;