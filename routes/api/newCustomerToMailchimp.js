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
	var email = (body.email).toLowerCase();
	var memberID = (md5(email));
	var first = body.first_name;
	var last = body.last_name;
	var tags = body.tags;
	var orderID = body.last_order_id;
	var fullname = (first+" "+last);
	var phone;
	var isCustomer = "No";
	var isMember = "No";
	var isGiftReceiver = "No";
	var hasActiveGift = "No";
	var isGiftGiver = "No";
	// console.log(body);
	if (body.default_address) {
		if (body.default_address.phone !== '') {
			phone = body.default_address.phone;
		} else {
			for (var i = 0; i < body.addresses.length; i++) {
				if (body.addresses[i].phone !== '') {
					phone = body.addresses[i].phone;
				} 
			};
		}
	}
	if (phone === undefined) {
		phone = ''
	}
	var tags = body.tags.split(', ');
	for (var i = 0; i < tags.length; i++) {
		if (tags[i] === 'Active Subscriber') {
			isMember = "Yes";
			isCustomer = "Yes";
			require('./referrals/memberCredit.js')(email);
		};
		if (tags[i] === 'Inactive Subscriber') {
			isMember = "No";
		};
		if (tags[i] === 'Gave Gift') {
			isGiftGiver = "Yes";
			isCustomer = "Yes";
		}
		if (tags[i] === 'Active Gift') {
			isGiftReceiver = "Yes";
			hasActiveGift = "Yes";
		};
		if (tags[i] === 'Inactive Gift') {
			isGiftReceiver = "Yes";
		}
	};
	if (orderID) {
		isCustomer = "Yes";
	}
	// console.log("Member "+isMember);
	// console.log("Customer "+isCustomer);
	// console.log("Receiver "+isGiftReceiver);
	// console.log("Giver "+isGiftGiver);
	// console.log("Active Gift "+hasActiveGift);
	// if (isCustomer === true) {
	// 	lifecyclestage = 'customer'
	// } else {
	// 	lifecyclestage = 'subscriber'
	// }
	//TODO: Get the customer's order ID and then get that order's description. 
	//   	Should be able to find out what type of subscription it is
	//TODO: Get the coupon used - can get when I parse the order information
	if (body.default_address){
		var address = (body.default_address.address1+' '+body.default_address.address2);
		var city = body.default_address.city;
		var state = body.default_address.province;
		var zip = body.default_address.zip;
		var country = body.default_address.country_code;
	} else {
		var address = '';
		var city = '';
		var state = '';
		var zip = '';
	}

	var data = {
		status : 'subscribed',
		email_address: email,
		"merge_fields": 
		{
		    "FNAME" : first,
		    "LNAME" : last,
		    "FULLNAME" : fullname,
		    "PHONE" : phone,
		    "STREET" : address,
		    "CITY" : city,
		    "STATE" : state,
		    "ZIP" : zip,
		    "MEMBER" : isMember,
		    "CUSTOMER" : isCustomer,
		    "ACTIVEGIFT" : hasActiveGift,
		    "GIVENGIFT" : isGiftReceiver,
		    "GIFTGIVER" : isGiftGiver
		    // "ADDRESS" : address+"  "+city+"  "+state+"  "+zip+"  "+country
		},
		"interests": 
		{
			"2f53c8667b" : true, // Newsletter
			"2225431578" : true, // Offers
			"7aea70668e" : false, // Brewery app
		}
	}
	// console.log("DATA: "+JSON.stringify(data));

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
			{ 'cache-control': 'no-cache',
			authorization: 'Basic '+keystone.get('mailchimp_api'),
		 	'content-type': 'application/json' },
		body: data,
		json: true 
	};

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
			console.log("Customer Update");
			console.log(body.merge_fields);
			res.apiResponse('success');
		} else {
			console.log("error");
			res.apiResponse('error')
		}
	})

	// request(getOptions, function (error, response, body) {
	// 	if (error) throw new Error(error);
	// 	console.log("status code: "+response.statusCode);
	// 	if (response.statusCode === 504) {
	// 		console.log("INFO: There was an error adding "+email+" to mailchimp");
	// 		console.log("ERROR: "+JSON.stringify(response));
	// 		res.apiResponse('error')
	// 	} else if (response.statusCode === 403) {
	// 		console.log("INFO: There was an error adding "+email+" to mailchimp");
	// 		console.log("ERROR: "+JSON.stringify(response));
	// 		res.apiResponse('error')
	// 	} else {
	// 		var body = JSON.parse(response.body);
	// 		var status = body.status;
	// 		// console.log(status);
	// 		if (response.statusCode === 404) {
	// 			request(postOptions, function(error, response, body){
	// 				if (error) throw new Error(error);
	// 				console.log(postOptions);
	// 				console.log(response.statusCode);
	// 				//console.log(body);
	// 				if (response.statusCode === 200) {
	// 					console.log("INFO: Added "+email+" to mailchimp");
	// 					res.apiResponse("success")
	// 				} else if (response.statusCode === 400) {
	// 					console.log("INFO: There was an error adding "+email+" to mailchimp");
	// 					console.log("error: "+JSON.stringify(error));
	// 					console.log("response: "+JSON.stringify(response));
	// 					console.log("body: "+JSON.stringify(body));
	// 					res.apiResponse('error')
	// 				}
	// 			})
	// 		} else if (response.statusCode === 400) {
	// 			console.log("INFO: There was an error adding "+email+" to mailchimp");
	// 			console.log("ERROR: "+JSON.stringify(response));
	// 			res.apiResponse('error')
	// 		} else {
	// 			console.log("INFO: "+email+" already existed in mailchimp");
	// 			//TODO: Add some way to update if they already exist
	// 			res.apiResponse('success');
	// 		}
	// 	}
	// });
}
