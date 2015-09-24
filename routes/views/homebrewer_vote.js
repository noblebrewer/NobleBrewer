var keystone = require('keystone');

exports = module.exports = function(req,res) {

	var view = new keystone.View(req,res),
		locals = res.locals;

	locals.section = 'homebrewer_vote';
	locals.filters = {
		isInCurrentVote: []
	};


	view.on('init', function(next) {
		var q = keystone.list('Homebrewers').model.find().where('inCurrentVote', true)

		q.exec(function(err, result) {
			locals.filters.isInCurrentVote = result;
			next(err);
		});

	});

	view.render('homebrewer_vote');

};

// var keystone = require('keystone'),
// 	redis = require('redis'),
// 	client = redis.createClient();


// client.on('connect', function() {
// 	console.log('connected');
// });

// client.on('error', function(err) {
// 	console.log("Error: "+err)
// })

// client.set('framework', 'AngularJS', function(err, reply){
// 	console.log(reply);
// })	

// client.hmset('frameworks', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');
// client.hgetall('frameworks',function(err, object){
// 	console.log(object);
// });


//   // Render the view
//   //res.render('/homebrewer_vote');


  
