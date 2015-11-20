var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;

	console.log(req.headers);
	var header = req.headers;
	if (header == 'blog') {
		res.redirect('/blog');
	}
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	
	// Render the view
	view.render('index_B');
	
};