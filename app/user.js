// var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
// var Q = require('q');
var db = require('../config');

// static salt
var SALT_WORK_FACTOR = 10;

// create the user schema for new users
var UserSchema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true},
  timestamp: {type: Date, default: Date.now},
  salt: String
});

// define user model (mongoose models are equivalent of collections, so users file is irrelevant)
var User = mongoose.model('User', UserSchema);

// export for use in handler functions
module.exports = User;