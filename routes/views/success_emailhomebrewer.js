var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = 'success_emailhomebrewer';
	
	// Render the view
	view.render('success_emailhomebrewer');
	
};
