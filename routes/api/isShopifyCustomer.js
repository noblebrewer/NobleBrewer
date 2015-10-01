var async = require('async'),
	keystone = require('keystone');
var request = require("request");


exports = module.exports = function(req, res) {

	var options = { method: 'GET',
		url: keystone.get('shopify_api')+'/admin/customers/search.json',
		qs: { query: 'email:'+req.body.emailaddress },
		headers: { 'content-type': 'application/json' } };

	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		if (body.length === 16){
			res.apiResponse(false)
		} else {
			res.apiResponse(true)
		}
	});
}

