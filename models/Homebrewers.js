var keystone = require("keystone"),
	Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Homebrewer = new keystone.List("Homebrewers", {
	map: { name: "brewerName" },
	autokey: { path: "slug", from: "brewerName.full", unique: true },
	defaultSort: "-brewerName"
});

Homebrewer.add(
	{heading: "Summary"},
	{brewerName: { type: Types.Name, required: true, initial: true},
	city: { type: String },
	state: { type: String },
	profilePicture: {type: Types.CloudinaryImage, required: false, initial: false},
	isFeaturedBrewer: { type: Types.Boolean, required: false}},
	{heading: "Full Profile"},
	{profileURL: { type: Types.Url, required: false },
	profileHeadline: { type: String, required: false },
	profileBrief: { type: Types.Html, required: false, "default": "Read more..." },
	profileBody: { type: Types.Html, required: false },
	profileVideo: { type: Types.Url, required: false },
	//beerList: { type: Types.Relationship, ref: 'Beers', index: true },
	featuredBeerType: { type: String },
	featuredBeerName: { type: String },
	featuredBeerURL: { type: Types.Url},
	featuredBeerShortDescription: { type: String },
	imageGallery: {type: Types.CloudinaryImages, required: false}  },
	{heading: "Other Data"},
	{brewerEmail: { type: Types.Email, displayGravatar: true },
	enteredDate: { type: Types.Date, "default": Date.now}}
);



Homebrewer.schema.virtual("profileUrlNormalized").get(function() {
	if (this.profilePicture.url) {
		var imageUrlParts = this.profilePicture.url.split("/");
		var newUrl = imageUrlParts.slice(0,6);
		newUrl.push("w_585,h_360,c_fill");
		newUrl = newUrl.concat(imageUrlParts.slice(6));
		newUrl = newUrl.join("/");
		return newUrl;
	} else {
		return "http://www.vtecsoft.com/images/default-avatar_0.png"
	}
});

Homebrewer.schema.virtual("thumbnailUrlNormalized").get(function() {
	if (this.profilePicture.url) {
		var imageUrlParts = this.profilePicture.url.split("/");
		var newUrl = imageUrlParts.slice(0,6);
		newUrl.push("w_128,h_128,c_thumb,g_faces");
		newUrl = newUrl.concat(imageUrlParts.slice(6));
		newUrl = newUrl.join("/");
		return newUrl;
	} else {
		return "http://www.vtecsoft.com/images/default-avatar_0.png"
	}
});

Homebrewer.schema.virtual("bannerUrlNormalized").get(function() {
	if (this.profilePicture.url) {
		var imageUrlParts = this.profilePicture.url.split("/");
		var newUrl = imageUrlParts.slice(0,6);
		newUrl.push("w_1300,h_450,c_fill,g_faces,e_sepia");
		newUrl = newUrl.concat(imageUrlParts.slice(6));
		newUrl = newUrl.join("/");
		return newUrl;
	} else {
		return "http://www.vtecsoft.com/images/default-avatar_0.png"
	}
});
	

Homebrewer.defaultColumns = ("brewerName, brewerEmail, city, state|15%, enteredDate");
Homebrewer.register();
