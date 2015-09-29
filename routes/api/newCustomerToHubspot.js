var async = require('async'),
	keystone = require('keystone');
var request = require("request");
var crypto = require('crypto');

/**
 * List Posts
 */
exports = module.exports = function(req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	console.log(req.body);
	var email = req.body.email;
	var first = req.body.first_name;
	var last = req.body.last_name;
	var tags = req.body.tags;
	var fullname = (first+" "+last)
	if (tags === "Active Subscriber") {
		console.log("true")
	}

	var data = { properties: 
	  [ { property: 'email', value: email },
	    { property: 'firstname', value: first },
	    { property: 'lastname', value: last },
	    { property: 'full_name', value: fullname } ] }

	console.log(data);
}
