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

	console.log(req.body);
	var body = req.body;

	mongoose.connect('mongodb://localhost:27017/noble-brewer');

	var db = mongoose.connection;
	db.on('error', function() {
		console.error.bind(console, 'connection error:')
		mongoose.disconnect();
		mongoose.connect('mongodb://localhost:27017/noble-brewer')
	});
	db.once('open', function() {
		  console.log("Database Opened");
	});

	var form = {
		email : body.email,
		first_name : body.first_name,
		last_name : body.last_name,
		referrer_email : body.referrer_email,
		date : body.date,
		email_hash : null,
		referrer_hash: null,
		utm_source : body.utm_source,
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
			callback();
		})
	}

	function editReferrerData(){
		memberData.find().where({ _id : (md5(form.referrer_email)) }).exec(function(err, person, callback) {
			if (person.length > 0) {
				editReferrer(person[0])
			} else {
				addReferrer();
			}
		})
	}

	function addReferrer(){
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
			mongoose.disconnect();
			res.apiResponse('success');
		})
	}

	function editReferrer(referrer) {
		//only push if doesn't already have credit for the referral
		for (var i = 0; i < referrer.people_referred.length; i++) {
			if (referrer.people_referred[i]._id === (md5(form.email))) {
				console.log("Already had credit for this email");
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
				})
			}
		}
		mongoose.disconnect();
		res.apiResponse('success');
	}
}