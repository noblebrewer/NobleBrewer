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
	if (req.body.email) {
		var fullName = (req.body.firstname+" "+req.body.lastname);
		var applied = 'Yes';
		if (req.body.function === 'homebrewer') {
			var data = { properties: 
			  [ { property: 'email', value: req.body.email },
			    { property: 'firstname', value: req.body.firstname },
			    { property: 'lastname', value: req.body.lastname },
			    { property: 'applied_to_be_a_homebrewer', value: applied},
			    { property: 'full_name', value: fullName } ] }
		} else if (req.body.function === 'email') {
			var data = { properties: 
				  [ { property: 'email', value: req.body.email } ] }
		} else if (req.body.function === 'registration') {
			var data = { properties: 
				  [ { property: 'email', value: req.body.email },
				    { property: 'firstname', value: req.body.firstname },
				    { property: 'lastname', value: req.body.lastname },
				    { property: 'full_name', value: fullName } ] }
		}

		var options = { method: 'POST',
			url: 'http://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/'+req.body.email+'/',
			qs: { hapikey: keystone.get('hubspot_api') },
			headers: { 'content-type': 'application/json' },
			body: data,
			json: true };

		request(options, function (error, response, body) {
			if (error) throw new Error(error);
			console.log(body);
			res.apiResponse({
				body:req.body,
				hubspot:body,
				status:body.status
			});
		});
	} else {
		console.log('not valid email');
	}
};


