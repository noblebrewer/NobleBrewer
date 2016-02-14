var keystone = require('keystone');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var md5 = require('md5');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports = module.exports = function(req,res) {

	var email = req.query.member_email

	var view = new keystone.View(req,res),
		locals = res.locals;

	locals.section = 'member_statuspage';

	mongoose.connect(keystone.get('mongo_url'));

	var db = mongoose.connection;
	db.on('error', function() {
		console.error.bind(console, 'connection error:')
		mongoose.disconnect();
		mongoose.connect(keystone.get('mongo_url'));
	});
	db.once('open', function() {
		  console.log("Database Opened");
		  getUserData();
	});

	function getUserData(){
		var memberData = require('../api/member_referral_schemas').memberData;
		memberData.find().where({ _id : (md5(email)) }).exec(function(err, person){
			if (person.length > 0){
				var points = calculatePoints(person[0]);
				locals.data = {
					member_email : email,
					page_hits : person[0].page_hits,
					referrals : person[0].people_referred,
					points : points,
					sharing_url : person[0].sharing_urls
				}
				console.log(locals.data);
				view.render('member_statuspage');
				mongoose.disconnect(function(){
					console.log("Database Closed");
				});
			} else {
				console.log("Person doesn't exist");
				view.render('member_statuspage');
				mongoose.disconnect();
			}	
		})
	}

	function calculatePoints(person){
		var points = person.people_referred.length;
		return points;
	}	
};