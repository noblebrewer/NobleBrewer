var MongoClient = require('mongodb').MongoClient;
var keystone = require('keystone')
var assert = require('assert');
var url = 'mongodb://localhost:27017/noble-brewer';
var ObjectId = require('mongodb').ObjectID;
var md5 = require('md5');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports = module.exports = function(req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	console.log(req.body);
	var body = req.body;

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

	var form = {
		referrer_email : body.referrer_email,
		date : body.date,
		referrer_hash: null,
		utm_source : body.utm_source
	}

	var referredPeople = require('./member_referral_schemas').referredPeople;
	var shareEvents = require('./member_referral_schemas').shareEvents;
	var pageHits = require('./member_referral_schemas').pageHits;
	var memberData = require('./member_referral_schemas').memberData;

	//check if new person, if so, then add

	memberData.find().where({ _id : (md5(form.referrer_email)) }).exec(function(err, person){
		if (person.length > 0) {
			console.log("Already existed");
			addPageHit(person[0]);
		} 
		else {
			addNewPerson();
		}
	});

	function addNewPerson(){
		var newPerson = new memberData({
			_id : (md5(form.referrer_email)),
			profile_details : {
				email : form.referrer_email,
			},
			membership_details : {
				member_status : "member"
			},
			page_hits : [{
				utm_source : form.utm_source,
				date : form.date
			}]
		})

		newPerson.save(function (err) {
			if (err) return console.log(err);
			console.log("Added new referrer");
			console.log("Added page hit");
			mongoose.disconnect();
			res.apiResponse('success');
		})
	}


	function addPageHit(referrer) {
		if (referrer.page_hits) {
			referrer.page_hits.push( { 
				date : form.date,
				utm_source : form.utm_source
			})
		} else {
			referrer.page_hits = [{
				date : form.date,
				utm_source : form.utm_source
			}]
		};
		
		referrer.save(function (err) {
			if (err) return console.log(err);
			console.log("Added page hit");
			mongoose.disconnect();
			res.apiResponse('success');
		})
	}
}