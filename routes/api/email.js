var async = require('async'),
	keystone = require('keystone');
var request = require("request");
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(keystone.get('mandrill_api'));

exports = module.exports = function(req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	var d = new Date();
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
	console.log(html);
	console.log(keystone.get('mandrill_api'));
	if (req.body.email) {
		var message = {
		    "html": html,
		    "subject": "Thanks for applying to be a Noble Brewer featured homebrewer",
		    "from_email": "support@noblebrewerbeer.com",
		    "from_name": "Noble Brewer",
		    "to": [{
		            "email": req.body.email,
		            "name": req.body.firstname,
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
		    "bcc_address": "support@noblebrewerbeer.com",
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
		    console.log("mandrill result"+result);
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

	};
}
