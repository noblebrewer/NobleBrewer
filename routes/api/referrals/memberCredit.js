var keystone = require('keystone');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var md5 = require('md5');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(email, res) {
	// console.log(email);
	if (email) {
		
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

		var referredPeople = require('../member_referral_schemas').referredPeople;
		var shareEvents = require('../member_referral_schemas').shareEvents;
		var pageHits = require('../member_referral_schemas').pageHits;
		var memberData = require('../member_referral_schemas').memberData;

		memberData.find().where({ _id : md5(email) }).exec(function(err, newMember){
			if (newMember) {
				if (newMember.length > 0) {
					// console.log(newMember);
					var referrerEmail = newMember[0].membership_details.referred_by;
					if (referrerEmail) {
						console.log("Found Referrer Email");
						memberData.find().where({ _id : md5(referrerEmail) }).exec(function(err, referrer){
							// console.log(referrer[0]);
							if (referrer[0]) {
								for (var i = 0; i < referrer[0].people_referred.length; i++) {
									console.log(referrer[0].people_referred[i].email)
									if (referrer[0].people_referred[i].email === newMember[0].profile_details.email) {
										referrer[0].people_referred[i].member_status = "member";
										referrer[0].save(function(err){
											console.log("Changed status to member");
										})
									}
								};
								// console.log(referrer);
							} else {
								// console.log(referrer);
							}
						})
					}
					// editReferrerData(function(){
					// 	mongoose.disconnect();
					// 	console.log("done");
					// 	res.apiResponse('success');
					// });
				} 
			}
		})
	}
}