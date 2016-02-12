var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shortenedURLsSchema = new Schema({
	_id : String,
	full_url : String,
	short_url_prefix : String,
	short_url_postfix : String,
	short_url_full : String
}, { autoIndex : false })

var shortenedURLs;

if (mongoose.models.shortenedURLs) {
	shortenedURLs = mongoose.model('shortenedURLs');
} else {
	shortenedURLs = mongoose.model('shortenedURLs', shortenedURLsSchema);
}

exports.shortenedURLs = shortenedURLs;