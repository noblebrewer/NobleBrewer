var keystone = require('keystone');
var MongoClient = require('mongodb').MongoClient;
var md5 = require('md5');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports = module.exports = function(req,res) {

	var view = new keystone.View(req,res),
		locals = res.locals;

	console.log("Got to the URL page");

	var url = req.url;
	var shortURL = url.split('/');
	var shortURL = shortURL[2];
	console.log(shortURL);

	mongoose.connect(keystone.get('mongo_url'));

	var db = mongoose.connection;
	db.on('error', function() {
		console.error.bind(console, 'connection error:')
		mongoose.disconnect();
		mongoose.connect(keystone.get('mongo_url'))
	});
	db.once('open', function() {
		  console.log("Database Opened");
	});

	var shortenedURLs = require('../api/noble_url_schemas').shortenedURLs;

	console.log(md5(shortURL));

	shortenedURLs.find().where({ _id : md5(shortURL) }).exec(function(err, url){
		console.log(url[0]);
		if (url[0]) {
			res.redirect(url[0].full_url);
			mongoose.disconnect();
		} else {
			view.render('shortURLError');
			mongoose.disconnect();
		}
		
	})

	// console.log(locals);

	// locals.filters = {
	// 	isInCurrentVote: []
	// };

	// locals.section = 'member_referral';

	// locals.data = {
	// 	member_email : req.query.member_email,
	// 	first_name : req.query.fname,
	// 	last_name : req.query.lname,
	// 	utm_source : req.query.utm_source
	// }

	// console.log(locals);

	// view.on('init', function(next) {
	// 	var q = keystone.list('Homebrewers').model.find().where('inCurrentVote', true)

	// 	q.exec(function(err, result) {
	// 		locals.filters.isInCurrentVote = result;
	// 		next(err);
	// 	});

	// });

	// view.render('member_referral');

};