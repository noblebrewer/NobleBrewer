var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;

	console.log(req.query);
	// console.log(location, version, source);

	locals.data = {
		location : req.params.location,
		version : req.params.version,
		source : req.params.source
	}

	// heap.track('untappd', 
	// 	{ 	city: req.params.location, 
	// 		version: req.params.version,
	// 		source : req.params.source });

	// console.log(locals.data);

	// var location = req.params.location;
	// var version = req.params.version;
	// var source = req.params.source;


	//TODO: Send event that the page was viewed?
	//TODO: Send event when email sign up (with location)
	//TODO: Not sure if we need those

	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'Untappd Noble Brewer';
	
	var shopify = keystone.get('shopify_hostname');
	res.redirect(shopify+'/pages/noble-brewer-samplers?untappd_location='+req.params.location
		+'&untappd_version='+req.params.version
		+'&untappd_source='+req.params.source
		+'&utm_content='+req.query.utm_content
		+'&utm_term='+req.query.utm_term
		+'&utm_campaign='+req.query.utm_campaign
		+'&utm_medium='+req.query.utm_medium
		+'&utm_source='+req.query.utm_source);

	// Render the view
	// view.render('landingpage_untappd');
	
};
