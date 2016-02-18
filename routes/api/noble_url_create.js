var keystone = require('keystone');
var MongoClient = require('mongodb').MongoClient;
var md5 = require('md5');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require('fs');
var csv = require('fast-csv');

	var columns = ['url'];
	var dataArray = [];
	var URLArray = [];

	// Uncomment this to run
	// Make sure to change which URL is being saved (twitter, facebook, etc)

	// mongoose.connect(keystone.get('mongo_url'));

	// var db = mongoose.connection;
	// db.on('error', function() {
	// 	console.error.bind(console, 'connection error:')
	// 	mongoose.disconnect();
	// 	mongoose.connect(keystone.get('mongo_url'))
	// });
	// db.once('open', function() {
	// 	  console.log("Database Opened");
	// });

	// require("csv-to-array")({
	//    file: "./routes/api/noble_url_tocreate.csv",
	//    columns: columns
	// }, function (err, array) {
	//   if (err) throw err;
	//   dataArray = array;
	//   wizard();
	// });

	function getNextURL(){
		if (dataArray.length > 0) {
			var record = dataArray.pop();
			console.log(record.email);
			saveNewURL(record);
		} else {
			saveCSV();
			console.log("finished");
			mongoose.disconnect();
		}
	}

	function wizard(){
		getNextURL();
	}; 

	function saveNewURL(record) {
		// var email = record.email;
		var url = record.url

		var Random = require('drossel-random');
		var length = 8;
		var checker = [] // put the array of current short arrays here to validate it doesn't exist yet

		var fullURL;
		var shortURL;
		var baseURL = "http://www.noblebrewer.com/nbb/"

		createShortURL(function(){
			var shortenedURLs = require('./noble_url_schemas').shortenedURLs;
			var memberData = require('./member_referral_schemas').memberData;
			var newURL = new shortenedURLs({
				_id : md5(shortURL),
				full_url : url,
				short_url : shortURL,
			})

			newURL.save(function(err){
				console.log("URL "+newURL);
				mongoose.disconnect();
			})

			// memberData.find().where({ _id : md5(email) }).exec(function(err, person){
			// 	if (person.length > 0){
			// 		person[0].sharing_urls.url_twitter = baseURL.concat(shortURL);
			// 		person[0].save(function(err) {
			// 			newURL.save(function(err){
			// 				if (err) return console.log(err);
			// 				console.log("Added new URL");
			// 				var newRecord = {
			// 					email : email,
			// 					shortURL : shortURL
			// 				}
			// 				URLArray.push(newRecord)
			// 				wizard();
			// 			})
			// 		})
			// 	} else {
			// 		person = new memberData({
			// 			_id : md5(email),
			// 			sharing_urls : {
			// 				url_twitter : baseURL.concat(shortURL)
			// 			}
			// 		})

			// 		person.save(function(err) {
			// 			newURL.save(function(err){
			// 				if (err) return console.log(err);
			// 				console.log("Added new URL");
			// 				var newRecord = {
			// 					email : email,
			// 					shortURL : shortURL
			// 				}
			// 				URLArray.push(newRecord)
			// 				wizard();
			// 			})
			// 		})
			// 	}
			// })
		});

		function createShortURL(callback){
			shortURL = Random.generate(length);
			console.log(shortURL);
			callback();
		}
	}

	function saveCSV() {
		var csvStream = csv.format({headers: false});
	    var writableStream = fs.createWriteStream("./routes/api/noble_url_created.csv");
	 
		writableStream.on("finish", function(){
		  console.log("DONE!");
		});
		 
		csvStream.pipe(writableStream);
		for (var i = 0; i < URLArray.length; i++) {
			csvStream.write(URLArray[i])
		};
		csvStream.end();
	}
