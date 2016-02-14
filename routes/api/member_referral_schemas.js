var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var referredPeopleSchema = new Schema({
	_id : String,
	first_name : String,
	last_name : String,
	email : String,
	date : Date,
	utm_source : String,
	member_status : String
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
		member_status : String, // unconfirmed, waiting_list, member, declined
		referred_by : String,
		converted_date : Date,
		signup_date : Date,
	},
	people_referred : [referredPeopleSchema],
	credits : Number,
	shares : [shareEventsSchema],
	page_hits : [pageHitsSchema],
	sharing_urls : {
		url_twitter : String,
		url_facebook : String,
		url_email : String
	}
}, { autoIndex : false })

var referredPeople; 
var pageHits; 
var memberData; 
var shareEvents; 

if (mongoose.models.referredPeople) {
	referredPeople = mongoose.model('referredPeople');
} else {
	referredPeople = mongoose.model('referredPeople', referredPeopleSchema);
}

if (mongoose.models.shareEvents) {
	shareEvents = mongoose.model('shareEvents');
} else {
	shareEvents = mongoose.model('shareEvents', shareEventsSchema);
}

if (mongoose.models.pageHits) {
	pageHits = mongoose.model('pageHits');
} else {
	pageHits = mongoose.model('pageHits', pageHitsSchema);
}

if (mongoose.models.memberData) {
	memberData = mongoose.model('memberData');
} else {
	memberData = mongoose.model('memberData', memberDataSchema);
}

console.log("Schemas created");

exports.referredPeople = referredPeople;
exports.pageHits = pageHits;
exports.memberData = memberData;
exports.shareEvents = shareEvents;


