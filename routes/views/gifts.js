var keystone = require('keystone');

exports = module.exports = function(req, res) {

	console.log(req._parsedUrl.pathname);

	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.data = {
		source: req.query.utm_source,
		medium: req.query.utm_medium,
		campaign: req.query.utm_campaign,
		content: req.query.utm_content,
		term: req.query.utm_term
	}

	if (req._parsedUrl.pathname == "/gifts") {
		view.render('yolo')
	} else {
			
		// Set locals
		locals.section = 'gifts';	
		
		// Render the view
		view.render('gifts');
	}

	
};
