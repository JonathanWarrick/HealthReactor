'use strict';

var db = require('../../config/database.js');
var User = require('./user.model.js');

var Users = new db.Collection();

Users.model = User;

module.exports = Users;
