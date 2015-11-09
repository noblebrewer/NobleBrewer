// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone'),
	cons = require('consolidate'),
	ejs = require('ejs');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'Noble Brewer',
	'brand': 'Noble Brewer',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'ejs',
  	'custom engine': ejs.renderFile,

	'emails': 'templates/emails',

	'hubspot_api': process.env.HUBSPOT_API,
	'shopify_api': process.env.SHOPIFY_API_KEY,
	'google_api' : process.env.GOOGLE_API_KEY,
	'mandrill_api' : process.env.MANDRILL_API_KEY,
	'winston_api' : process.env.WINSTON_KEY,
	'newrelic_api' : process.env.NEW_RELIC_KEY,
	'hostname' : process.env.HOSTNAME,
	'shopify_hostname' : process.env.SHOPIFY_HOSTNAME,
	'blog_hostname' : process.env.BLOG_HOSTNAME,
	'heap_var' : process.env.HEAP,
	'shopify_secret' : process.env.SHOPIFY_SHARED_SECRET,
	'redis_url' : process.env.REDIS_URL,
	'mailchimp_api' : process.env.MAILCHIMP_API_KEY,

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': ';=Ngo"aIO0aKJb$wmfySr4WC>]kqT_WOrTCKL1rRyv-R{wvE!d|U~e,1e11R+MbM'

});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

keystone.set('email locals', {
	logo_src: '/images/logo-email.gif',
	logo_width: 194,
	logo_height: 76,
	theme: {
		email_bg: '#f9f9f9',
		link_color: '#2697de',
		buttons: {
			color: '#fff',
			background_color: '#2697de',
			border_color: '#1a7cb7'
		}
	}
});

// Setup replacement rules for emails, to automate the handling of differences
// between development a production.

// Be sure to update this rule to include your site's actual domain, and add
// other rules your email templates require.

keystone.set('email rules', [{
	find: '/images/',
	replace: (keystone.get('env') == 'production') ? 'http://www.your-server.com/images/' : 'http://localhost:3000/images/'
}, {
	find: '/keystone/',
	replace: (keystone.get('env') == 'production') ? 'http://www.your-server.com/keystone/' : 'http://localhost:3000/keystone/'
}]);

// Load your project's email test routes

keystone.set('email tests', require('./routes/emails'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'posts': ['posts', 'post-categories'],
	'galleries': 'galleries',
	'enquiries': 'enquiries',
	'user': 'User',
	'Homebrewers': 'Homebrewers',
	'Beers': 'Beers',
	'Releases' : 'Releases'


});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
