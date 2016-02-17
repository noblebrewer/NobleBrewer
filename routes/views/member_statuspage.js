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

	var memberData = require('../api/member_referral_schemas').memberData;

	function getUserData(){
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
				saveNewPerson()
			}
		})
	}

	function calculatePoints(person){
		var points = person.people_referred.length;
		return points;
	}	

	function saveNewPerson(){
		var newPerson = new memberData({
			_id : md5(email),
			profile_details : {
				email : email
			},
			membership_details : {
				member_status : "active",
			}
		})

		createURLs(newPerson, function() {
			newPerson.save(function (err) {
				if (err) return console.log(err);
				console.log("Added new member");
				view.render('member_statuspage');
				mongoose.disconnect();
			})
		})
	}

	function createURLs(record){
		var email = record.profile_details.email;

		var Random = require('drossel-random');
		var length = 8;

		var fullURLBase = "http://www.noblebrewer.com/VIPStatus";
		var shortURLBase = "http://www.noblebrewer.com/nb/";

		var fullURLTwitter = fullURLBase+"?utm_source=members&utm_medium=twitter&utm_campaign=member_referral";
		var fullURLEmail = fullURLBase+"?utm_source=members&utm_medium=email&utm_campaign=member_referral";
		var fullURLFacebook = fullURLBase+"?utm_source=members&utm_medium=facebook&utm_campaign=member_referral";
		var shortURLTwitter = Random.generate(length);
		var shortURLEmail = Random.generate(length);
		var shortURLFacebook = Random.generate(length);

		var shortenedURLs = require('../api/noble_url_schemas').shortenedURLs;
		var memberData = require('../api/member_referral_schemas').memberData;
		var newTwitterURL = new shortenedURLs({
			_id : md5(shortURLTwitter),
			full_url : fullURLTwitter,
			short_url : shortURLTwitter,
		})

		var newFacebookURL = new shortenedURLs({
			_id : md5(shortURLFacebook),
			full_url : fullURLFacebook,
			short_url : shortURLFacebook,
		})

		var newEmailURL = new shortenedURLs({
			_id : md5(shortURLEmail),
			full_url : fullURLEmail,
			short_url : shortURLEmail,
		})

		memberData.find().where({ _id : md5(email) }).exec(function(err, person){
			if (person.length > 0){
				person[0].sharing_urls.url_twitter = shortURLBase.concat(shortURLTwitter);
				person[0].sharing_urls.url_facebook = shortURLBase.concat(shortURLFacebook);
				person[0].sharing_urls.url_email = shortURLBase.concat(shortURLEmail);
				person[0].save(function(err) {
					newTwitterURL.save(function(err){
						if (err) return console.log(err);
						console.log("Added Twitter URL");
						newFacebookURL.save(function(err){
							if (err) return console.log(err);
							console.log("Added Facebook URL");
							newEmailURL.save(function(err){
								if (err) return console.log(err);
								console.log("Added Email URL");
								locals.data = {
									member_email : email,
									page_hits : null,
									referrals : [],
									points : 0,
									sharing_url : person[0].sharing_urls
								}
								view.render('member_statuspage')
								mongoose.disconnect(function(){
									console.log("Database Closed");
								});
							})
						})
					})
				})
			} else {
				person = new memberData({
					_id : md5(email),
					sharing_urls : {
						url_twitter : shortURLBase.concat(shortURLTwitter),
						url_facebook : shortURLBase.concat(shortURLFacebook),
						url_email : shortURLBase.concat(shortURLEmail)
					}
				})

				person.save(function(err) {
					newTwitterURL.save(function(err){
						if (err) return console.log(err);
						console.log("Added Twitter URL");
						newFacebookURL.save(function(err){
							if (err) return console.log(err);
							console.log("Added Facebook URL");
							newEmailURL.save(function(err){
								if (err) return console.log(err);
								console.log("Added Email URL");
								locals.data = {
									member_email : email,
									page_hits : null,
									referrals : [],
									points : 0,
									sharing_url : person.sharing_urls
								}
								view.render('member_statuspage')
								mongoose.disconnect(function(){
									console.log("Database Closed");
								});
							})
						})
					})
				})
			}
		})
	}
};