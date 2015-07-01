var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var User = new keystone.List('User', {
  map: { name: 'userName' },
  autokey: { path: 'slug', from: 'userName', unique: true }
});

User.add(  
 		{
 		//basic info
		name: { type: Types.Name, required: true, initial: true},
		userName: { type: String, initial: true, required: true },
		password: { type: Types.Password, initial: true, required: true },
		emailAddress: { type: Types.Email, initial: true, required: true },
		
		//Classification flags
		isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
		isBrewer: { type: Types.Boolean },
		
		//subscription information
		subscriptionType: { type: Types.Select, options: ['Quarterly', 'Yearly'] },
		subscriptionStatus: { type: Types.Select, options: ['Active', 'On Hold', 'Cancelled'] },
		releasesReceived: { type: Types.Relationship, ref: 'Releases'},
		
		//other info
		dateSignedUp: { type: Types.Date, default: Date.now },
		notesAboutUser: { type: Types.Textarea, height: 100 }, //Totally a random guess on the height. This is showing you the height in pixels. 
		//applyCredit: { type: Types.Boolean },
		//I put this flag in there so that the bottom fields would only show if they were going to appply credit, but then couldn't figure out how to get it to work. 
		
		//Shipping address
		shippingName: { type: Types.Name },
		shippingAddress: { type: Types.Location},

		//Billing address
		billingName: { type: Types.Name },
		billingAddress: { type: Types.Location},
		phoneNumber: { type: Types.Number}}

);

User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});

User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });
User.relationship({ ref: 'Credit', path: 'credit', refPath: 'user' });


User.defaultColumns = 'userName, isAdmin, emailAddress';
User.register();
	