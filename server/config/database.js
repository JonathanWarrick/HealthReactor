var Bookshelf = require('bookshelf');
var path = require('path');

var db = Bookshelf.initialize({
  client: 'sqlite3',
  connection: {
    host: '127.0.0.1',
    user: 'your_database_user',
    password: 'password',
    database: 'healthreactordb-dev',
    charset: 'utf8',
    filename: path.join(__dirname, '../db/healthreactordb-dev.sqlite')
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.string('password', 100);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('activities').then(function(exists) {
	if (!exists) {
		db.knex.schema.createTable('activities', function(pointsSubmission) {
			activities.increments('id').primary();
			activities.string('username', 100);
			activities.date('submissionDate');
			activities.integer('waterPoints');
			activities.integer('stairsPoints');
			activities.integer('yogaPoints');
			activities.integer('workoutPoints');
			activities.integer('meditationPoints');
			activities.integer('walkingPoints');
		}).then(function (table) {
			console.log('Created Table', table);
		});
	}
});

module.exports = db;