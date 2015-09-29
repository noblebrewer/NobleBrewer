var async = require('async'),
	keystone = require('keystone');
var request = require("request");

/**
 * List Posts
 */
exports = module.exports = function(req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	console.log(req.body);
}