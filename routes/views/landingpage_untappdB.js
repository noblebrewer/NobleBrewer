var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;

	
	// console.log(location, version, source);

	locals.data = {
		location : req.params.location,
		version : req.params.version,
		source : req.params.source
	}
	// var location = req.params.location;
	// var version = req.params.version;
	// var source = req.params.source;


	//TODO: Send event that the page was viewed?
	//TODO: Send event when email sign up (with location)
	//TODO: Not sure if we need those

	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'Untappd Noble Brewer';
	
	// Render the view
	view.render('landingpage_untappdB');
	
};
