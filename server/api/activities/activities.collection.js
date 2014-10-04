'use strict';

var db = require('../../config/database.js');
var ActivitySubmission = require('./activities.model.js');

var ActivitySubmissions = new db.Collection();

ActivitySubmissions.model = ActivitySubmission;

module.exports = ActivitySubmissions;
