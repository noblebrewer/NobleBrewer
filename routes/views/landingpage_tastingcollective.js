var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;

	// locals.section = 'brewers';
	locals.filters = {
		featuredBrewers: []
	};

	locals.data = {
		source: req.query.utm_medium || "Tasting Collective"
	}

	if (req.query.utm_medium == "tasting_collective") {
		locals.data.source = "Tasting Collective"
	}
	
	view.on('init', function(next) {
		var q = keystone.list('Homebrewers').model.find().where('isFeaturedBrewer', true)

		q.exec(function(err, result) {
			locals.filters.featuredBrewers = result;
			next(err);
		});

	});

	console.log(req.headers.host);
	var header = req.headers;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'Tasting Collective';
	
	// Render the view
	view.render('landingpage_tastingcollective');
	
};