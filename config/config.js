
mongoose.connect('mongodb://localhost/healthreactordb');

var db = mongoose.connection;

db.once('open', function() {
	console.log("Connected to the database"); 
});

module.exports = db;