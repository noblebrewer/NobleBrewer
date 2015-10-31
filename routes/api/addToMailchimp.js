var async = require('async'),
	keystone = require('keystone');
var request = require("request");
var md5 = require('md5');

exports = module.exports = function(req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	var email = (req.body.email).toLowerCase();
	var memberID = (md5(email));

	var getOptions = { method: 'GET',
		url: 'https://us12.api.mailchimp.com/3.0/lists/6256d8517b/members/'+memberID,
		qs: { 'content-header': '' },
		headers: 
			{ 'cache-control': 'no-cache',
			authorization: 'Basic '+keystone.get('mailchimp_api'),
			'content-type': 'application/json' } 
	};

	var postOptions = 
	{
		method: 'POST',
		url: 'https://us12.api.mailchimp.com/3.0/lists/6256d8517b/members/',
		headers: 
			{ 'postman-token': '50c2fa5e-5e9b-4d7b-06e1-8fff9b763851',
		 	'cache-control': 'no-cache',
			authorization: 'Basic '+keystone.get('mailchimp_api'),
		 	'content-type': 'application/json' },
		body: 
			{ 
				status: 'subscribed',
				email_address: email 
			},
		json: true 
	};

	request(getOptions, function (error, response, body) {
		if (error) throw new Error(error);
		console.log(response.statusCode);
		var body = JSON.parse(response.body);
		var status = body.status;
		console.log(status);
		if (response.statusCode === 404) {
			request(postOptions, function(error, response, body){
				if (error) throw new Error(error);
				console.log(response.statusCode);
				console.log(body);
				if (response.statusCode === 200) {
					res.apiResponse("success")
				}
			})
		} else {
			res.apiResponse(status);
		}
	});
}
