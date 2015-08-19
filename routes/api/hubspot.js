var async = require('async'),
	keystone = require('keystone');
var request = require("request");

/**
 * List Posts
 */
exports = module.exports = function(req, res) {
	var fullName = (req.body.first_name+" "+req.body.last_name);
	var options = { method: 'POST',
		url: 'http://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/'+req.body.email+'/',
		qs: { hapikey: keystone.get('hubspot_api') },
		headers: { 'content-type': 'application/json' },
		body: 
		{ properties: 
		  [ { property: 'email', value: req.body.email },
		    { property: 'firstname', value: req.body.first_name },
		    { property: 'lastname', value: req.body.last_name },
		    { property: 'full_name', value: fullName } ] },
		json: true };

	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		res.apiResponse({
			body:req.body,
			hubspot:body
		});
	});
};


