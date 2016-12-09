var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;

	// locals.section = 'brewers';
	locals.filters = {
		featuredBrewers: []
	};

	locals.data = {
		source: req.query.utm_source,
		medium: req.query.utm_medium,
		campaign: req.query.utm_campaign,
		content: req.query.utm_content,
		term: req.query.utm_term
	}

	// if (req.query.utm_medium == "my_subscription_addiction") {
	// 	locals.data.source = "My Subscription Addiction"
	// }
	
	view.on('init', function(next) {
		var q = keystone.list('Homebrewers').model.find().where('isFeaturedBrewer', true)

		q.exec(function(err, result) {
			locals.filters.featuredBrewers = result;
			next(err);
		});

	});

	console.log(req.headers.host);
	var header = req.headers;
	if (header.host == 'blog.noblebrewer.com') {
		res.redirect('/blog');
	}
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	
	// Render the view
	view.render('yolo');
	
};