var async = require('async'),
	keystone = require('keystone');
var request = require("request");


exports = module.exports = function(req, res) {

	var options = { method: 'GET',
		url: 'https://4439f01a1abd6ec2e67c77a0444df99b:cd24b952d3551735eca0bdc27fa66ff5@noblebrewer.myshopify.com/admin/customers/search.json',
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

