var keystone = require('keystone');

exports = module.exports = function(req,res) {

	var view = new keystone.View(req,res),
		locals = res.locals;

	locals.section = 'brewerProfile';
	locals.data = {
		allBrewers: []
	};


	view.on('init', function(next) {

		var q = keystone.list('Homebrewers').model.find().sort('-brewerName');

		q.populate('tagName');

		q.exec(function(err,results) {

			locals.data.allBrewers = results
			next(err);

		});
	});

	view.render('brewerProfile');

};

