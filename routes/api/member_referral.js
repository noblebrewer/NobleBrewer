var keystone = require('keystone');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
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


	var referredPeople = require('./member_referral_schemas').referredPeople;
	var shareEvents = require('./member_referral_schemas').shareEvents;
	var pageHits = require('./member_referral_schemas').pageHits;
	var memberData = require('./member_referral_schemas').memberData;

	var form = {
		email : body.email,
		first_name : body.first_name,
		last_name : body.last_name,
		referrer_email : body.referrer_email,
		date : body.date,
		email_hash : (md5(body.email)),
		referrer_hash: (md5(body.referrer_email)),
		utm_source : body.utm_source,
	}

	//check if new person, if so, then add

	memberData.find().where({ _id : form.email_hash }).exec(function(err, person){
		if (person.length > 0) {
			console.log("Already existed");
			editReferrerData(function(){
				mongoose.disconnect();
				console.log("done");
				res.apiResponse('success');
			});
		} 
		else {
			addNewPerson(function(){
				editReferrerData();
			});
		}
	});

	function addNewPerson(callback){
		var newPerson = new memberData({
			_id : form.email_hash,
			profile_details : {
				first_name : form.first_name,
				last_name : form.last_name,
				email : form.email
			},
			membership_details : {
				member_status : "unconfirmed",
				referred_by : form.referrer_email
			}
		})

		newPerson.save(function (err) {
			if (err) return console.log(err);
			console.log("Added new person");
			callback();
		})
	}

	function editReferrerData(){
		memberData.find().where({ _id : form.referrer_hash }).exec(function(err, person, callback) {
			if (person.length > 0) {
				editReferrer(person[0])
			} else {
				addReferrer();
			}
		})
	}

	function addReferrer(){
		var newPerson = new memberData({
			_id : form.referrer_hash,
			profile_details : {
				email : form.referrer_email
			},
			membership_details : {
				member_status : "active",
			},
			people_referred :  [{ 
				_id : form.email_hash,
				first_name : form.first_name,
				last_name : form.last_name,
				email : form.email,
				date : form.date(),
				utm_source : form.utm_source,
				member_status : "unconfirmed"
			}]
		})

		newPerson.save(function (err) {
			if (err) return console.log(err);
			console.log("Added new referrer");
			mongoose.disconnect();
			res.apiResponse('success');
		})
	}

	function editReferrer(referrer) {
		//only push if doesn't already have credit for the referral
		var credit = false; // doesn't have credit for this email
		for (var i = 0; i < referrer.people_referred.length; i++) {
			if (referrer.people_referred[i]._id === form.email_hash) {
				console.log("Already had credit for this email");
				credit = true;
			} else {
				console.log("Doesn't have credit for email");
			}
		}
		if (credit === false){
			referrer.people_referred.push( { 
				_id : form.email_hash,
				first_name : form.first_name,
				last_name : form.last_name,
				email : form.email,
				date : Date.now(),
				utm_source : form.utm_source,
				member_status : "unconfirmed"
			})
			referrer.save(function (err) {
				if (err) return console.log(err);
				console.log("Edited existing referrer");
				mongoose.disconnect();
				res.apiResponse('success');
			})
		} else {
			mongoose.disconnect();
			res.apiResponse('success');
		}
	}
}