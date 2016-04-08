var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;

	// locals.section = 'brewers';
	locals.filters = {
		featuredBrewers: []
	};


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
	locals.section = 'Untappd Noble Brewer';
	
	// Render the view
	view.render('landingpage_untappd');
	
};
	
	// locals.section = 'Untappd Noble Brewer';
	
	// var shopify = keystone.get('shopify_hostname');
	// res.redirect(shopify+'/pages/noble-brewer-samplers?untappd_location='+req.params.location
	// 	+'&untappd_version='+req.params.version
	// 	+'&untappd_source='+req.params.source
	// 	+'&utm_content='+req.query.utm_content
	// 	+'&utm_term='+req.query.utm_term
	// 	+'&utm_campaign='+req.query.utm_campaign
	// 	+'&utm_medium='+req.query.utm_medium
	// 	+'&utm_source='+req.query.utm_source);
