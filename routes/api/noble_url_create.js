var keystone = require('keystone');
var MongoClient = require('mongodb').MongoClient;
var md5 = require('md5');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports = module.exports = function(req,res) {

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

	var Random = require('drossel-random');
	var length = 8;
	var checker = [] // put the array of current short arrays here to validate it doesn't exist yet

	var fullURL = 'http://localhost:3000/VIPstatus?member_email=claude@noblebrewer.com&fname=claude&lname=burns&utm_source=email&utm_campaign=member_referral';
	var shortURL;
	var URLBase = "http://www.noblebrewer.com/nb/";

	createShortURL(function(){
		var shortenedURLs = require('./noble_url_schemas').shortenedURLs
		var newURL = new shortenedURLs({
			_id : md5(shortURL),
			full_url : fullURL,
			short_url_prefix : URLBase,
			short_url_postfix : shortURL,
			short_url_full : URLBase.concat(shortURL)
		})

		newURL.save(function(err){
			if (err) return console.log(err);
			console.log("Added new URL");
			mongoose.disconnect();
			console.log("Database closed");
		})
	});

	function createShortURL(callback){
		shortURL = Random.generate(length);
		console.log(shortURL);
		callback();
	}
}