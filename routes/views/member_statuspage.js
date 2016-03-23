var keystone = require('keystone');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var md5 = require('md5');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports = module.exports = function(req,res) {

	var email = req.query.member_email;
	var first_name = req.query.first_name;
	var last_name = req.query.last_name;

	var friends = {
		unconfirmed : [],
		confirmed : [],
		members : []
	}

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
			console.log(person);
			// console.log(person[0].profile_details)
			if (person && person.length > 0){
				if (!person[0].profile_details.first_name) {
					person[0].profile_details.email = email;
					person[0].profile_details.first_name = first_name;
					person[0].profile_details.last_name = last_name;
					person[0].save(function(err){
						console.log("Saved member details");
					})
				}
				if (!person[0].sharing_urls.url_twitter) { // If they don't have URLs made
					createURLs(person[0])
				} else {
					// person[0].sharing_urls = {}
					// person[0].save()
					// console.log(person[0].sharing_urls);
					var points = calculatePoints(person[0]);
					locals.data = {
						member_email : email,
						page_hits : person[0].page_hits,
						unconfirmed_referrals : friends.unconfirmed,
						confirmed_referrals : friends.confirmed,
						member_referrals : friends.members,
						points : points,
						sharing_url : person[0].sharing_urls
					}
					console.log(locals.data);
					view.render('member_statuspage');
					mongoose.disconnect(function(){
						console.log("Database Closed");
					})
				}
			} else {
				saveNewPerson()
			}
		})
	}

	function calculatePoints(person){
		console.log(person.people_referred);
		var count = 0;
		for (var i = 0; i < person.people_referred.length; i++) {
			var personObject = {
				name : person.people_referred[i].first_name+" "+person.people_referred[i].last_name,
				email : person.people_referred[i].email
			}
			if (person.people_referred[i].member_status === 'waiting_list'){
				count = count + 1;
				friends.confirmed.push(personObject)
			} else if (person.people_referred[i].member_status === 'member') {
				console.log("Member");
				console.log(personObject);
				count = count + 4;
				friends.confirmed.push(personObject)
				friends.members.push(personObject)
			} else {
				friends.unconfirmed.push(personObject)
			}
		};
		console.log(friends);
		return count;
	}	

	function saveNewPerson(){
		var newPerson = new memberData({
			_id : md5(email),
			profile_details : {
				email : email,
				first_name : first_name,
				last_name : last_name
			},
			membership_details : {
				member_status : "active",
			}
		})

		newPerson.save(function(err) {
			createURLs(newPerson)
		})

		// createURLs(newPerson, function() {
		// 	newPerson.save(function (err) {
		// 		if (err) return console.log(err);
		// 		console.log("Added new member");
		// 		view.render('member_statuspage');
		// 		mongoose.disconnect();
		// 	})
		// })
	}

	function createURLs(record){
		console.log("Creating URLs");
		var email = record.profile_details.email;
		var first_name = record.profile_details.first_name;
		var last_name = record.profile_details.last_name;

		var Random = require('drossel-random');
		var length = 8;

		var fullURLBase = "/VIPStatus?member_email="+email+"&fname="+first_name+"&lname="+last_name;
		var shortURLBase = "http://www.noblebrewer.com/nb/";

		var fullURLTwitter = fullURLBase+"&utm_source=members&utm_medium=twitter&utm_campaign=member_referral";
		var fullURLEmail = fullURLBase+"&utm_source=members&utm_medium=email&utm_campaign=member_referral";
		var fullURLFacebook = fullURLBase+"&utm_source=members&utm_medium=facebook&utm_campaign=member_referral";
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
									first_name : first_name,
									last_name : last_name,
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