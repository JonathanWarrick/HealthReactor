'use strict';

module.exports = function(app) {
	
	// insert application routes
	app.use('/auth', require('.auth'));
};