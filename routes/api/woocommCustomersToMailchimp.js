var async = require('async'),
	keystone = require('keystone');
var request = require("request");
var crypto = require('crypto');
var md5 = require('md5');
var sleep = require('sleep');

var columns = ['status','email','first','last','address1','address2','city','zip','country','state'];
var dataArray = [];

//Uncomment this to run it.

// require("csv-to-array")({
//    file: "./woocomm_subscribers.csv",
//    columns: columns
// }, function (err, array) {
//   if (err) throw err;
//   dataArray = array;
//   wizard();
// });

function getNextCustomer(){
	if (dataArray.length > 0) {
		var record = dataArray.pop();
		console.log(record.email);
		addToMailchimp(record);
	} else {
		console.log("finished");
	}
}

function wizard(){
  getNextCustomer();
}; 

function addToMailchimp(customer) {
	var email = (customer.email).toLowerCase();
	var memberID = (md5(email));
	var first = customer.first;
	var last = customer.last;
	var fullname = (first+" "+last);
	var isCustomer = "No";
	var isMember = "No";
	var isGiftReceiver = "No";
	var hasActiveGift = "No";
	var isGiftGiver = "No";
	// console.log(body);
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
	
	if (customer.status === 'Active') {
		isMember = "Yes";
		isCustomer = "Yes";
	} else {
		isMember = "No";
		isCustomer = "Yes";
	}

	if (customer.address1){
		var address = (customer.address1+' '+customer.address2);
		var city = customer.city;
		var state = customer.state;
		var zip = '';
		var country = customer.country;
	} else {
		var address = '';
		var city = '';
		var state = '';
		var zip = '';
		var country = '';
	}

	var data = {
		status : 'subscribed',
		email_address: email,
		"merge_fields": 
		{
		    "FNAME" : first,
		    "LNAME" : last,
		    "FULLNAME" : fullname,
		    "STREET" : address,
		    "CITY" : city,
		    "STATE" : state,
		    "ZIP" : zip,
		    "MEMBER" : isMember,
		    "CUSTOMER" : isCustomer
		    // "ACTIVEGIFT" : hasActiveGift,
		    // "GIVENGIFT" : isGiftReceiver,
		    // "GIFTGIVER" : isGiftGiver
		    // "ADDRESS" : address+"  "+city+"  "+state+"  "+zip+"  "+country
		}
	}
	// console.log("DATA: "+JSON.stringify(data));

	var putOptions = 
	{
		method: 'PUT',
		url: 'https://us12.api.mailchimp.com/3.0/lists/6256d8517b/members/'+memberID,
		headers: 
			{ 'cache-control': 'no-cache',
			authorization: 'Basic dd9a48b09e80247063a36614a42cfa18-us12',
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
			wizard();
		} else {
			console.log("error adding "+body.email_address);
			wizard();
		}
	})
}



