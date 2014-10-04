var Bookshelf = require('bookshelf');
var path = require('path');

var db = Bookshelf.initialize({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'healthreactordbdev',
    charset: 'utf8'
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
		db.knex.schema.createTable('activities', function(activity) {
			activity.increments('id').primary();
			activity.string('username', 100);
			activity.string('submissionDate');
			activity.integer('waterPoints');
			activity.integer('stairsPoints');
			activity.integer('yogaPoints');
			activity.integer('workoutPoints');
			activity.integer('meditationPoints');
			activity.integer('walkingPoints');
      activity.timestamps();
		}).then(function (table) {
			console.log('Created Table', table);
		});
	}
});

module.exports = db;