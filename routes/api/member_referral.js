var MongoClient = require('mongodb').MongoClient;
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

	mongoose.connect('mongodb://localhost:27017/noble-brewer');

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		  console.log("Database Opened");
	});

	var form = {
		email : "caitlin@noblebrewerbeer.com",
		first_name : "Caitlin",
		last_name : "Mohnike",
		referrer_email : "claude@noblebrewer.com",
		date : Date.now(),
		email_hash : null,
		referrer_hash: null,
		utm_source : "email",
	}

	var referredPeopleSchema = new Schema({
		_id : String,
		first_name : String,
		last_name : String,
		email : String,
		date : Date,
		utm_source : String
	}, { autoIndex : false })

	var shareEventsSchema = new Schema ({
		type : String,
		date : Date
	}, { autoIndex : false })

	var pageHitsSchema = new Schema ({
		utm_source : String,
		date : Date
	}, { autoIndex : false })

	var  memberDataSchema = new Schema({
		_id : String,
		profile_details : {
			first_name : String,
			last_name : String,
			email : String,
		},
		membership_details : {
			member_status : String, //waiting_list, member, declined
			referred_by : String,
			converted_date : Date,
			signup_date : Date,
		},
		people_referred : [referredPeopleSchema],
		credits : Number,
		shares : [shareEventsSchema],
		page_hits : [pageHitsSchema]
	}, { autoIndex : false })

	var referredPeople = mongoose.model('referredPeople', referredPeopleSchema)
	var shareEvents = mongoose.model('shareEvents', shareEventsSchema)
	var pageHits = mongoose.model('pageHits', pageHitsSchema)
	var memberData = mongoose.model('memberData', memberDataSchema)

	//check if new person, if so, then add

	memberData.find().where({ _id : (md5(form.email)) }).exec(function(err, person){
		if (person.length > 0) {
			console.log("Already existed");
			editReferrerData();
		} 
		else {
			addNewPerson(function(){
				editReferrerData(function(){
					mongoose.connection.close()
					res.apiResponse('success');
				});
			});
		}
	});

	function addNewPerson(callback){
		var newPerson = new memberData({
			_id : (md5(form.email)),
			profile_details : {
				first_name : form.first_name,
				last_name : form.last_name,
				email : form.email
			},
			membership_details : {
				member_status : "waiting_list",
				referred_by : form.referrer_email
			}
		})

		newPerson.save(function (err) {
			if (err) return console.log(err);
			console.log("Added new person");
			callback()
		})
	}

	function editReferrerData(callback){
		memberData.find().where({ _id : (md5(form.referrer_email)) }).exec(function(err, person) {
			if (person.length > 0) {
				editReferrer(person[0], callback)
			} else {
				addReferrer(callback);
			}
		})
	}

	function addReferrer(callback){
		var newPerson = new memberData({
			_id : (md5(form.referrer_email)),
			profile_details : {
				email : form.referrer_email
			},
			membership_details : {
				member_status : "active",
			},
			people_referred :  [{ 
				_id : (md5(form.email)),
				first_name : form.first_name,
				last_name : form.last_name,
				email : form.email,
				date : Date.now(),
				utm_source : form.utm_source
			}],
		})

		newPerson.save(function (err) {
			if (err) return console.log(err);
			console.log("Added new referrer");
			callback();
		})
	}

	function editReferrer(referrer, callback) {
		//only push if doesn't already have credit for the referral
		for (var i = 0; i < referrer.people_referred.length; i++) {
			if (referrer.people_referred[i]._id === (md5(form.email))) {
				console.log("Already had credit for this email");
				callback();
			} else {
				referrer.people_referred.push( { 
					_id : (md5(form.email)),
					first_name : form.first_name,
					last_name : form.last_name,
					email : form.email,
					date : Date.now(),
					utm_source : form.utm_source
				})

				referrer.save(function (err) {
					if (err) return console.log(err);
					console.log("Edited existing referrer");
					callback()
				})
			}
		};
	}
}