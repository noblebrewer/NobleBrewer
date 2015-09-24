var keystone = require('keystone'),
	redis = require('redis'),
	client = redis.createClient();

exports = module.exports = function(req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	console.log("request: "+req.body.emailaddress);
	client.on('connect', function() {
		console.log('connected');
	});

	client.on('error', function(err) {
		console.log("Error: "+err)
	})

	var userEmail = ('email:'+req.body.emailaddress)
	console.log(userEmail);

	client.hmget(userEmail, 'vote', function(err, object){
		console.log("object: "+object)
		console.log("err: "+err)
		if (object) {
			client.hmset(userEmail, 'vote', req.body.vote, 'date', req.body.date, function(err, reply){
			console.log("reply: "+reply);
			console.log("err: "+err);
		});
		}
	});


	client.hmget(userEmail, 'vote', function(err, object){
		console.log("object: "+object)
		console.log("err: "+err)	
	});

}