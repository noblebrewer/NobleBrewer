var keystone = require('keystone');

exports = module.exports = function(req,res) {

	// var view = new keystone.View(req,res),
	// 	locals = res.locals;

	// locals.section = 'brewers';
	// locals.filters = {
	// 	featuredBrewers: []
	// };

	// locals.data = {
	// 	allBrewers: []
	// };


	// view.on('init', function(next) {
	// 	var q = keystone.list('Homebrewers').model.find().where('isFeaturedBrewer', true)

	// 	q.exec(function(err, result) {
	// 		locals.filters.featuredBrewers = result;
	// 		next(err);
	// 	});

	// });

	// view.on('init', function(next) {

	// 	var q = keystone.list('Homebrewers').model.find().sort('-brewerName')

	// 	q.exec(function(err,results) {

	// 		locals.data.allBrewers = results
	// 		next(err);

	// 	});
	// });

	view.render('User');

};

