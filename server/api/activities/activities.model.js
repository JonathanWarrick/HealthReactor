'use strict';

var db = require('../../config/database.js');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var ActivitySubmission = db.Model.extend({
  tableName: 'activities',
  // hasTimestamps: true,
  defaults: {
    waterPoints: 0,
    stairsPoints: 0, 
    yogaPoints: 0,
    workoutPoints: 0,
    meditationPoints: 0,
    walkingPoints: 0
  }
});

module.exports = ActivitySubmission;
