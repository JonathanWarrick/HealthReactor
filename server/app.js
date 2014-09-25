'use strict';

// require Express to handle server routing, calls, etc.
var express = require('express');

// require Body Parser to automatically parse request body
var bodyParser = require('body-parser');

// create app using an Express instance
var app = express();

// establish port, either using environmental variable or default static port value
var port = process.env.PORT || 7777;

// configure Body Parser
// Returns middleware that only parses urlencoded bodies. This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser());

// configure static path for index.html
app.use(express.static(__dirname + '../../client')); // dirname is '/server' right now

// open connection to port
app.listen(port);
console.log('Server running on port %d', port);

exports = module.exports = app;
