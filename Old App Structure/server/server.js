var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/healthreactordb');

// Configure middleware!!! ***

module.exports = app;