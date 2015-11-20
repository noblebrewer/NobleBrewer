var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;

	console.log(req.headers.host);
	var header = req.headers;
	if (header.host == 'blog.noblebrewer.com') {
		res.redirect('/blog');
	}
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	
	// Render the view
	view.render('index');
	
};
