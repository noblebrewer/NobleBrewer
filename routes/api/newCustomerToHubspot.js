var async = require('async'),
	keystone = require('keystone');
var request = require("request");
var crypto = require('crypto');

//NOTE: If someone goes from a customer to a subscriber, this will not 'take'
//		hubspot doesn't allow for going backwards on the chain. This is a 
//		future TODO.

exports = module.exports = function(req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	var body = req.body;
	var email = body.email;
	var first = body.first_name;
	var last = body.last_name;
	var tags = body.tags;
	var fullname = (first+" "+last);
	var phone;
	var isCustomer = false;
	var lifecyclestage;
	console.log(body);
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
			isCustomer = true;
		}
	};
	if (isCustomer === true) {
		lifecyclestage = 'customer'
	} else {
		lifecyclestage = 'subscriber'
	}
	//TODO: Get the customer's order ID and then get that order's description. 
	//   	Should be able to find out what type of subscription it is
	//TODO: Get the coupon used - can get when I parse the order information
	var orderID = body.last_order_id;
	if (body.default_address){
		var address = (body.default_address.address1+' '+body.default_address.address2);
		var city = body.default_address.city;
		var state = body.default_address.province;
		var zip = body.default_address.zip;
	}
	var data = { "properties": 
	  [ { "property": 'email', value: email },
	    { "property": 'firstname', value: first },
	    { "property": 'lastname', value: last },
	    { "property": 'full_name', value: fullname },
	    { "property": 'phone', value: phone},
	    { "property": 'lifecyclestage', value: lifecyclestage}, 
	    { "property": 'address', value: address}, 
	    { "property": 'city', value: city}, 
	    { "property": 'state', value: state}, 
	    { "property": 'zip', value: zip } ] }
	console.log(data);

	var options = { method: 'POST',
		url: 'http://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/'+email+'/',
		qs: { hapikey: keystone.get('hubspot_api') },
		headers: { 'content-type': 'application/json' },
		body: data,
		json: true };

	request(options, function (error, response, body) {
		if (response.statusCode === 200) {
			console.log("Updated "+email+' in the hubspot database')
			res.apiResponse(response.statusCode)
		} else {
			console.log(response.statusCode);
			console.log("error updating "+email+" in hubspot");
			res.apiResponse(response.statusCode)
		}
	});

}
