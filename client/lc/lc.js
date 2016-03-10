 goog.provide('lc');

 goog.require('prestans.rest.json.Client');

lc = function() {};

lc.GLOBALS = {
	API_CLIENT: new prestans.rest.json.Client({
		baseUrl: "/api",
		opt_numRetries: 0,
		opt_minified: false
	})
};