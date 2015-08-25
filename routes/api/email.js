var async = require('async'),
	keystone = require('keystone');
var request = require("request");
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(keystone.get('mandrill_api'));

exports = module.exports = function(req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if (req.body.function === 'homebrewer') {
		var html = (
			req.body.firstname+",<br><br>"
			+"Thanks for applying to be a featured homebrewer! We are excited to read about your awesome brews. If you need to change any of the details below, please email us at support@noblebrewerbeer.com."
			+"<br><br>"
			+"<h4>Name: </h4>"+req.body.fullname
			+"<br><h4>Email: </h4>"+req.body.email
			+"<br><h4>Location: </h4>"+req.body.location
			+"<br><h4>Recipe you'd brew: </h4>"+req.body.recipe
			+"<br><h4>Reason for applying: </h4>"+req.body.reason
			+"<br><h4>Awards you've won: </h4>"+req.body.awards
			+"<br><br>"
			+"-The Noble Brewer Team"
			)
		var subject = "Thanks for applying to be a Noble Brewer featured homebrewer";
		var from_email = "support@noblebrewerbeer.com";
		var from_name = "Noble Brewer";
		var to_email = req.body.email;
		var to_name = req.body.firstname;
		var bcc = "support@noblebrewerbeer.com";
	} else if (req.body.function === 'contact-homebrewer') {
		var html = (req.body.messageContents)
		var subject = "New message for "+req.body.brewerEmail;
		var from_email = "support@noblebrewerbeer.com";
		var from_name = "Noble Brewer";
		var to_email = req.body.brewerEmail;
		var to_name = null;
		var bcc = null;
	}
	var message = {
	    "html": html,
	    "subject": subject,
	    "from_email": from_email,
	    "from_name": from_name,
	    "to": [{
	            "email": to_email,
	            "name": to_name,
	            "type": "to"
	        }],
	    "headers": {
	        "Reply-To": "support@noblebrewerbeer.com"
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
	    "bcc_address": bcc,
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
	    res.apiResponse({
			email:email,
			status:status,
			reject:rejectreason
		});
	    /*
	    [{
	            "email": "recipient.email@example.com",
	            "status": "sent",
	            "reject_reason": "hard-bounce",
	            "_id": "abc123abc123abc123abc123abc123"
	        }]
	    */
	}, function(e) {
	    // Mandrill returns the error as an object with name and message keys
	    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
	});
}
