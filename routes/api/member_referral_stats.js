// var keystone = require('keystone');
// var MongoClient = require('mongodb').MongoClient;
// var md5 = require('md5');
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var fs = require('fs');
// var csv = require('fast-csv');
// var ReverseMd5 = require('reverse-md5')

// var reverseMd5 = ReverseMd5({
// 	lettersUpper: false,
// 	lettersLower: true,
// 	numbers: true,
// 	special: true,
// 	whitespace: false,
// 	maxLen: 30
// })

// 	// Uncomment this to run
// 	// Make sure to change which URL is being saved (twitter, facebook, etc)

// mongoose.connect("mongodb://heroku_mfz0djt3:5rfdgslal1iu093b2v28gcpogm@ds037523-a0.mongolab.com:37523,ds037523-a1.mongolab.com:37523/heroku_mfz0djt3?replicaSet=rs-ds037523");

// var db = mongoose.connection;
// db.on('error', function() {
// 	console.error.bind(console, 'connection error:')
// 	mongoose.disconnect();
// 	mongoose.connect(keystone.get('mongo_url'))
// });
// db.once('open', function() {
// 	console.log("Database Opened");
// });

// var shortenedURLs = require('./noble_url_schemas').shortenedURLs;
// var memberData = require('./member_referral_schemas').memberData;

// var memberArray = [{
// 	email : String,
// 	pageHits : Number,
// 	peopleReferred : Number
// }];

// memberData.find().where({"page_hits.0" : {$exists : true}}).exec(function(err, member) {
// 	console.log(err);
// 	// console.log(member);
// 	for (var i = 0; i < member.length; i++) {
// 		console.log(member[i].profile_details.email+" referred "+member[i].people_referred.length+"/"+member[i].page_hits.length);
// 		console.log(member[i]._id)
// 		// console.log(member[i].sharing_urls.url_email);
// 		// console.log(member[i].people_referred.length);
// 		// console.log(member[i].page_hits.length);
// 	};
// 	mongoose.disconnect();
// })

// 			// memberData.find().where({ _id : md5(email) }).exec(function(err, person){
// 			// 	if (person.length > 0){
// 			// 		person[0].sharing_urls.url_twitter = baseURL.concat(shortURL);
// 			// 		person[0].save(function(err) {
// 			// 			newURL.save(function(err){
// 			// 				if (err) return console.log(err);
// 			// 				console.log("Added new URL");
// 			// 				var newRecord = {
// 			// 					email : email,
// 			// 					shortURL : shortURL
// 			// 				}
// 			// 				URLArray.push(newRecord)
// 			// 				wizard();
// 			// 			})
// 			// 		})
// 			// 	} else {
// 			// 		person = new memberData({
// 			// 			_id : md5(email),
// 			// 			sharing_urls : {
// 			// 				url_twitter : baseURL.concat(shortURL)
// 			// 			}
// 			// 		})

// 			// 		person.save(function(err) {
// 			// 			newURL.save(function(err){
// 			// 				if (err) return console.log(err);
// 			// 				console.log("Added new URL");
// 			// 				var newRecord = {
// 			// 					email : email,
// 			// 					shortURL : shortURL
// 			// 				}
// 			// 				URLArray.push(newRecord)
// 			// 				wizard();
// 			// 			})
// 			// 		})
// 			// 	}
// 			// })
