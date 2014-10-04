var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');

var db = require('./database.js');
var User = require('../app/models/user');
var ActivitySubmission = require('../app/models/link');
var Users = require('../app/collections/users');
var ActivitySubmissions = require('../app/collections/links');