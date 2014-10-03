'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: String,
	password: String,
  pointsSubmissions: Schema.Types.Mixed
	// pointsSubmissions: {
	// 	date: {
	// 		waterInitiative: Number,
	// 		stairsInitiative: Number,
	// 		yogaInitiative: Number,
	// 		workoutInitiative: Number,
	// 		meditationInitiative: Number,
	// 		walkingInitiative: Number
	// 	}
	// }
});

/**
 * Pre-save hook
 */
// UserSchema
//   .pre('save', function(next) {
//     if (!this.isNew) return next();

//     if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
//       next(new Error('Invalid password'));
//     else
//       next();
//   });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

module.exports = mongoose.model('User', UserSchema);


// {
// 	username: "jonathan", 
// 	password: "test",
// 	dates: {
// 		'today': {
// 			yoga: 10,
// 			walk: 20,
// 			etc: 30,
// 		},
// 		'tomorrow': {
// 			yoga: 10, 
// 			walk: 20,
// 			etc: 30
// 		}
// 	}
// };