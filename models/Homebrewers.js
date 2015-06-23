var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Homebrewers', {
	map: { name: 'brewerName' },
	autokey: { path: 'slug', from: 'brewerName', unique: true },
	defaultSort: '-brewerName'
});

Post.add(
	{heading: 'Summary'},
	{brewerName: { type: Types.Name, required: true, initial: true},
	city: { type: String },
	state: { type: String },
	profilePicture: {type: Types.CloudinaryImage, required: false, initial: false }},
	{heading: 'Full Profile'},
	{profileURL: { type: Types.Url, required: false },
	profileHeadline: { type: String, required: false },
	profileBody: { type: Types.Textarea, required: false },
	profileVideo: { type: Types.Url, required: false },
	beerList: {type: String, required: false }  },
	{heading: 'Other Data'},
	{brewerEmail: { type: Types.Email, displayGravatar: true },
	
	enteredDate: { type: Types.Date, default: Date.now}}
	
);

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});
	
Post.defaultColumns = 'brewerName, brewerEmail, city, state|15%, enteredDate';
Post.register();
