var keystone = require('keystone');

exports = module.exports = function(req,res) {

	var view = new keystone.View(req,res),
		locals = res.locals;

	locals.section = 'homebrewer_vote';
	locals.filters = {
		isInCurrentVote: []
	};


	view.on('init', function(next) {
		var q = keystone.list('Homebrewers').model.find().where('inCurrentVote', true)

		q.exec(function(err, result) {
			locals.filters.isInCurrentVote = result;
			next(err);
		});

	});

	view.render('homebrewer_vote');

};