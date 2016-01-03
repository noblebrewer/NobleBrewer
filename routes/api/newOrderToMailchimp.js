var async = require('async'),
	keystone = require('keystone');
var request = require("request");
var crypto = require('crypto');
var md5 = require('md5');

//NOTE: If someone goes from a customer to a subscriber, this will not 'take'
//		hubspot doesn't allow for going backwards on the chain. This is a 
//		future TODO.

exports = module.exports = function(req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	var body = req.body;
	var email;
	var first;
	var last;
	var fullname;
	var isCustomer = "No";
	var isMember = "No";
	var isGiftReceiver = "No";
	var hasActiveGift = "No";
	var isGiftGiver = "No";
	// console.log(body);

	var giftDetails = body.note_attributes;
	if (giftDetails) {
		for (var i = 0; i < giftDetails.length; i++) {
			if (giftDetails[i].name === 'recipientName') {
				fullname = giftDetails[i].value;
				var nameArray = fullname.split(' ');
				first = nameArray[0];
				last = nameArray[1]
			} else if (giftDetails[i].name === 'recipientEmail') {
				email = giftDetails[i].value;
				email = email.toLowerCase();
				var memberID = (md5(email));
			};
		};
		// console.log("Name "+first, last, fullname);
		// console.log("Email "+email);
		isGiftReceiver = "Yes";
		hasActiveGift = "Yes";
		
		if (memberID) {
			var data = {
				status : 'subscribed',
				email_address: email,
				"merge_fields": 
				{
				    "FNAME" : first,
				    "LNAME" : last,
				    "FULLNAME" : fullname,
				    "ACTIVEGIFT" : hasActiveGift,
				    "GIVENGIFT" : isGiftReceiver,
				    "EMSOURCE" : "gift-recipient"
				}
			}
			// console.log("DATA: "+JSON.stringify(data));

			var putOptions = 
			{
				method: 'PUT',
				url: 'https://us12.api.mailchimp.com/3.0/lists/6256d8517b/members/'+memberID,
				headers: 
					{ 'cache-control': 'no-cache',
					authorization: 'Basic '+keystone.get('mailchimp_api'),
				 	'content-type': 'application/json' },
				body: data,
				json: true 
			};

			// console.log(putOptions);

			request(putOptions, function (error, response, body){
				if (error) throw new Error(error);
				// console.log(body);
				console.log("status code: "+response.statusCode);
				if (response.statusCode === 200) {
					console.log("Updated "+body.email_address+" in Mailchimp")
					console.log("Gift Recipient");
					console.log(body.merge_fields);
					res.apiResponse('success');
				} else {
					console.log("error");
					res.apiResponse('error')
				}
			})
		} else {
			console.log("Gift Details but no email address");
			res.apiResponse('success');
		}	
		// console.log("Member "+isMember);
		// console.log("Customer "+isCustomer);
		// console.log("Receiver "+isGiftReceiver);
		// console.log("Giver "+isGiftGiver);
		// console.log("Active Gift "+hasActiveGift);

		
	} else {
		console.log("No Gift Details");
		res.apiResponse('success')
	}
}
