var keystone = require('keystone');

exports = module.exports = function(req,res) {

	var view = new keystone.View(req,res),
		locals = res.locals;

	// console.log(locals);

	// locals.filters = {
	// 	isInCurrentVote: []
	// };

	locals.section = 'member_referral';

	locals.data = {
		member_email : req.query.member_email,
		first_name : req.query.fname,
		last_name : req.query.lname,
		utm_source : req.query.utm_source
	}


	// view.on('init', function(next) {
	// 	var q = keystone.list('Homebrewers').model.find().where('inCurrentVote', true)

	// 	q.exec(function(err, result) {
	// 		locals.filters.isInCurrentVote = result;
	// 		next(err);
	// 	});

	// });

	view.render('member_referral_b');

};