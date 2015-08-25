var keystone = require('keystone');

exports = module.exports = function(req,res) {

	var view = new keystone.View(req,res),
		locals = res.locals;

	locals.section = 'brewerProfile';
	locals.filters = {
		brewer: req.params.profile
	}
	locals.data = {
		brewer: []
	};


	view.on('init', function(next) {
		
		if (req.params.profile) {

			var q = keystone.list('Homebrewers').model.findOne({
				slug: locals.filters.brewer
			});
			
			q.exec(function(err, result) {
				locals.data.brewer = result;
				next(err);
			});
		} else {
			next(err);
		}
	});
		

	view.render('brewerProfile');

};

