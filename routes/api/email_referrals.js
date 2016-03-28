var async = require('async'),
	keystone = require('keystone');
var request = require("request");
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(keystone.get('mandrill_api'));

module.exports = {
	newCredit : function(person, mergeFields, next) {
		console.log(person);
		// Bring in the person's name
		// Bring in their link
		// Bring in their points
		// res.header('Access-Control-Allow-Origin', '*');
		// res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		// res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
		var email = Object;
		email.html = (
			// '<p><a href="http://giphy.com/gifs/celebration-new-followers-happy-s-11QXGKKoR7l7Ec">via GIPHY</a></p>'
			'<p>Hi there!</p>'
			+'<p>Great news! You just had another friend sign up on your referral page.</p>'
			+'<a href="http://www.noblebrewer.com/member?member_email='+mergeFields.REFERRAL+'">Check out who it was.</a>'
		)
		email.subject = "You just earned a Pint! Huzzah!!";
		email.from_email = "referrals@noblebrewer.com";
		email.from_name = "Noble Brewer";
		email.to_email = mergeFields.REFERRAL;
		// email.to_name = mergeFields.FNAME;
		email.bcc = "caitlin@noblebrewer.com";
		sendEmail(email, function(results){
			console.log(results);
			next();
		});
	}
}

function sendEmail(email, callback){
	var message = {
	    "html": email.html,
	    "subject": email.subject,
	    "from_email": email.from_email,
	    "from_name": email.from_name,
	    "to": [{
	            "email": email.to_email,
	            // "name": email.to_name,
	            "type": "to"
	        }],
	    "headers": {
	        "Reply-To": email.from_email
	    },
	    "important": false,
	    "track_opens": null,
	    "track_clicks": null,
	    "auto_text": null,
	    "auto_html": null,
	    "inline_css": null,
	    "url_strip_qs": null,
	    "preserve_recipients": null,
	    "view_content_link": null,
	    "bcc_address": email.bcc,
	    "tracking_domain": null,
	    "signing_domain": null,
	    "return_path_domain": null,
	    "merge": true,
	    "merge_language": "mailchimp",
	};
	var async = false;
	var ip_pool = "Main Pool";
	var send_at = null;
	mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {
	    var email = result[0].email;
	    var status = result[0].status;
	    var rejectreason = result[0].reject_reason;
	    callback({
			email:email,
			status:status,
			reject:rejectreason
		});
	}, function(e) {
	    // Mandrill returns the error as an object with name and message keys
	    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
	});
}

// exports = module.exports = function(req, res) {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
// 	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// 	if (req.body.function === 'homebrewer') {
// 		var html = (
// 			req.body.firstname+",<br><br>"
// 			+"Thanks for applying to be a featured homebrewer! We are excited to read about your awesome brews. If you need to change any of the details below, please email us at support@noblebrewer.com."
// 			+"<br><br>"
// 			+"<h4>Name: </h4>"+req.body.fullname
// 			+"<br><h4>Email: </h4>"+req.body.email
// 			+"<br><h4>Location: </h4>"+req.body.location
// 			+"<br><h4>Recipe you'd brew: </h4>"+req.body.recipe
// 			+"<br><h4>Reason for applying: </h4>"+req.body.reason
// 			+"<br><h4>Awards you've won: </h4>"+req.body.awards
// 			+"<br><br>"
// 			+"-The Noble Brewer Team"
// 			)
// 		var subject = "Thanks for applying to be a Noble Brewer featured homebrewer";
// 		var from_email = "support@noblebrewer.com";
// 		var from_name = "Noble Brewer";
// 		var to_email = req.body.email;
// 		var to_name = req.body.firstname;
// 		var bcc = "bcc@noblebrewer.com";
// 	} else if (req.body.function === 'contact-homebrewer') {
// 		console.log("Sending new email to homebrewer: "+req.body.brewerEmail);
// 		var html = (req.body.messageContents)
// 		var subject = "New message for "+req.body.brewerEmail;
// 		var from_email = "support@noblebrewer.com";
// 		var from_name = "Noble Brewer";
// 		var to_email = req.body.brewerEmail;
// 		var to_name = null;
// 		var bcc = null;
// 	} else if (req.body.function === 'dropahint') {
// 		var html = (
// 			'<body style="background-color:white">'
// 			    +'<section class="row">'
// 			        +'<h4 style="color:#C5A77E; font-size:1.6em; line-height:1.45em; text-transform: uppercase; text-align:center; padding-top:50px">'
// 			            +req.body.firstname+' is dropping you a hint'
// 			        +'</h4>'
// 			        +'<img src="http://res.cloudinary.com/tradecraft/image/upload/v1441156267/u9g0mrw3tvqlqa9hoshi.png" style="width:100%;text-align:center">'
// 			        +'<div style="text-align:left">'
// 			            +'<p>We were asked to let you know that '+req.body.firstname+' would love to receive a Noble Brewer craft beer subscription this year for the holidays. This is what they had to say about it...</p>'
// 			            +'<p><i>"'+req.body.excited+'"</i></p><br>'
// 			            //+'<p>They would really love the: '+req.body.gift+'</p>'
// 			            +'<p>To spread more holiday cheer this season, we are giving you 15% off to help you fulfill their craft beer dreams. Just use code THEGIFTOFBEER at checkout.</p>'
// 			            +'<br>'
// 			            +'<a style="color:black;background-color:#C5A77E;letter-spacing:1px;font-weight:bold;border-radius:4px;border:2px solid transparent;height:56px;margin-top:10px;margin-bottom: 10px;margin-right:15px;padding:14px;min-width:200px;text-transform:uppercase" href="http://dev.shop.noblebrewer.com/pages/subscription">Shop gifts now</a>'
// 			            +'<br><br>'
// 			            +'<p>Cheers!</p>'
// 			            +'<p>-The Noble Brewer Team</p>'
// 			            +'<br><br>'
// 			        +'</div>'
// 			    +'</section>'
// 			+'</body>'
// 			)
// 		var subject = req.body.firstname+" is dropping you a hint for the holidays. Get 15% off today!";
// 		var from_email = "support@noblebrewer.com";
// 		var from_name = "Noble Brewer";
// 		var to_email = req.body.friend;
// 		var to_name = null;
// 		var bcc = "bcc@noblebrewer.com";
// 	}
// 	var message = {
// 	    "html": html,
// 	    "subject": subject,
// 	    "from_email": from_email,
// 	    "from_name": from_name,
// 	    "to": [{
// 	            "email": to_email,
// 	            "name": to_name,
// 	            "type": "to"
// 	        }],
// 	    "headers": {
// 	        "Reply-To": "support@noblebrewer.com"
// 	    },
// 	    "important": false,
// 	    "track_opens": null,
// 	    "track_clicks": null,
// 	    "auto_text": null,
// 	    "auto_html": null,
// 	    "inline_css": null,
// 	    "url_strip_qs": null,
// 	    "preserve_recipients": null,
// 	    "view_content_link": null,
// 	    "bcc_address": bcc,
// 	    "tracking_domain": null,
// 	    "signing_domain": null,
// 	    "return_path_domain": null,
// 	    "merge": true,
// 	    "merge_language": "mailchimp",
// 	};
// 	var async = false;
// 	var ip_pool = "Main Pool";
// 	var send_at = null;
// 	mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {
// 	    var email = result[0].email;
// 	    var status = result[0].status;
// 	    var rejectreason = result[0].reject_reason;
// 	    res.apiResponse({
// 			email:email,
// 			status:status,
// 			reject:rejectreason
// 		});
// 	    /*
// 	    [{
// 	            "email": "recipient.email@example.com",
// 	            "status": "sent",
// 	            "reject_reason": "hard-bounce",
// 	            "_id": "abc123abc123abc123abc123abc123"
// 	        }]
// 	    */
// 	}, function(e) {
// 	    // Mandrill returns the error as an object with name and message keys
// 	    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
// 	    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
// 	});
// }
