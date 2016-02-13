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

	if (req.body.type === 'subscribe') {
		var updatedEmail = req.body.data.email;
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
		var memberData = require('./member_referral_schemas').memberData;
		var referredPeople = require('./member_referral_schemas').referredPeople;
		
		memberData.find().where({ _id : (md5(updatedEmail)) }).exec(function(err, person){
			if (person[0]) {
				if (person[0].membership_details) {
					person[0].membership_details.member_status = "waiting_list";
					person[0].save(function (err) {
						if (err) return console.log(err);
						console.log("Changed person status");
						searchReferredMembers(function(){
							mongoose.disconnect(function(){
								console.log("Database closed");
								res.apiResponse('success');
							});
						});
					})
				} else {
					console.log("Person not in database");
					mongoose.disconnect(function(){
						console.log("Database closed");
						res.apiResponse('success');
					});
				}
			} else {
				mongoose.disconnect(function(){
					console.log("Person not in database");
					console.log("Database closed");
					res.apiResponse('success');
				});
			}
		})

		function searchReferredMembers(callback) {
			memberData.find().where({ 'people_referred._id' : (md5(updatedEmail)) }).exec(function(err, person){
				if (person) {
					for (var i = 0; i < person[0].people_referred.length; i++) {
						if (person[0].people_referred[i]._id === (md5(updatedEmail))) {
							person[0].people_referred[i].member_status = "waiting_list";
						}
					};
					
					person[0].save(function (err) {
						if (err) return console.log(err);
						console.log("Changed person status");
						callback();
					})
				} 
			})
		}
	} else {
		res.apiResponse('succcess');
	}
}