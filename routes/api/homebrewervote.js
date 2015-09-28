var keystone = require('keystone'),
	redis = require('redis'),
	client = redis.createClient(keystone.get('redis_url'));

var brewer1 = 'lostlocal';
var brewer2 = 'papadoc';
var brewer3 = 'myers';
var brewer4 = 'boden';

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

	client.hget(userEmail, 'vote', function(err, object){
		if (object !== null) {
			var brewer1votes = client.get(brewer1);
			console.log("else "+brewer1votes);
			getVoteCount(function(reply){
				res.apiResponse(reply)
			})		
		} else {
			client.hmset(userEmail, 'vote', req.body.vote, 'date', req.body.date, function(err, reply){
				if (!err) {
					client.incr(req.body.vote, function(err, reply){
						getVoteCount(function(reply){
							res.apiResponse(reply)
						})
					})
				} else {
					console.log("error: "+err);
				}
			})
		}
	});

	function getVoteCount(next){
		
		var brewer1votes;
		var brewer2votes;
		var brewer3votes;
		var brewer4votes;
		client.get(brewer1, function(err, reply){
			brewer1votes = reply
			client.get(brewer2, function(err, reply){
				brewer2votes = reply
				client.get(brewer3, function(err, reply){
					brewer3votes = reply
					client.get(brewer4, function(err, reply){
						brewer4votes = reply
						var total = brewer1votes + brewer2votes + brewer3votes + brewer4votes;
						var response = {
							one : brewer1votes,
							two : brewer2votes,
							three : brewer3votes,
							four : brewer4votes
						}
						client.end();
						next(response);	
					})
				})
			})
		});
	}
}

