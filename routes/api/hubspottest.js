// var async = require('async'),
// 	keystone = require('keystone');
// var request = require("request");


// var data = { properties: 
// 	[ { property: 'email', value: 'claude+77@noblebrewerbeer.com' } ] }


// var options = { method: 'POST',
// 			url: 'http://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/'+'claude+77@noblebrewerbeer.com'+'/',
// 			qs: { hapikey: keystone.get('hubspot_api') },
// 			headers: { 'content-type': 'application/json' },
// 			body: data,
// 			json: true };

// 		request(options, function (error, response, body) {
// 			if (error) throw new Error(error);
// 			console.log(body.status);
// 			console.log(body)
// 		});




// all the different methods I can use above

	// res.header('Access-Control-Allow-Origin', '*');
	// res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	// res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	// if (req.body.email) {
	// 	var yes = 'Yes';
	// 	if (req.body.function === 'homebrewer') {
	// 		var data = { properties: 
	// 		  [ { property: 'email', value: req.body.email },
	// 		    { property: 'firstname', value: req.body.firstname },
	// 		    { property: 'lastname', value: req.body.lastname },
	// 		    { property: 'applied_to_be_a_homebrewer', value: yes},
	// 		    { property: 'full_name', value: req.body.fullname } ] }
	// 	} else if (req.body.function === 'email') {
	// 		var data = { properties: 
	// 			  [ { property: 'email', value: req.body.email } ] }
	// 	} else if (req.body.function === 'registration') {
	// 		var data = { properties: 
	// 			  [ { property: 'email', value: req.body.email },
	// 			    { property: 'firstname', value: req.body.firstname },
	// 			    { property: 'lastname', value: req.body.lastname },
	// 			    { property: 'full_name', value: req.body.fullname } ] }
	// 	} else if (req.body.function === 'dropahint') {
	// 		var data = { properties: 
	// 		  [ { property: 'email', value: req.body.email },
	// 		    { property: 'firstname', value: req.body.firstname },
	// 		    { property: 'lastname', value: req.body.lastname },
	// 		    { property: 'full_name', value: req.body.fullname },
	// 		    { property: 'asked_for_gift', value: yes}
	// 		    // { property: 'friend', value: req.body.friend },
	// 		    // { property: 'excited', value: req.body.excited },
	// 		    // { property: 'gift', value: req.body.gift } 
	// 		    ] }
	// 	}

	// 	var options = { method: 'POST',
	// 		url: 'http://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/'+req.body.email+'/',
	// 		qs: { hapikey: keystone.get('hubspot_api') },
	// 		headers: { 'content-type': 'application/json' },
	// 		body: data,
	// 		json: true };

	// 	request(options, function (error, response, body) {
	// 		if (error) throw new Error(error);
	// 		console.log(body.status);
	// 		res.apiResponse({
	// 			body:req.body,
	// 			hubspot:body,
	// 			status:body.status
	// 		});
	// 	});
	// } else {
	// 	res.apiResponse({
	// 		status:'email'
	// 	})
	// }



