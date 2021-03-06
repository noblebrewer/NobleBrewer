/**
 * This file is where you define your application routes and controllers.
 * 
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 * 
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 * 
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 * 
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 * 
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone'),
	middleware = require('./middleware'),
	importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api')
};

// Setup Route Bindings
exports = module.exports = function(app) {

	var beercollection = (keystone.get('shopify_hostname')+"/collections/beer")
	
	// Views
	app.get('/', routes.views.index);
	app.get('/home', routes.views.index_B);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.get('/about', routes.views.about);
	app.get('/brewers', routes.views.brewers);
	app.get('/beers', routes.views.beers);
	app.get('/profile/:profile?', routes.views.brewerProfile);
	app.get('/beerProfile/:beerName?', routes.views.beerProfile);
	app.get('/terms', routes.views.terms);
	app.get('/privacy', routes.views.privacy);
	app.get('/shipping', routes.views.shipping);
	app.get('/return', routes.views.return);
	app.get('/team', routes.views.index);
	app.get('/faq', routes.views.faq);
	app.get('/frequently-asked-questions', routes.views.faq);
	app.get('/press', routes.views.press);
	app.get('/releases', routes.views.releases);
	app.get('/user', routes.views.user);
	app.get('/subscription', routes.views.customize);
	app.get('/subscriptions', routes.views.customize);
	app.get('/gifts', routes.views.gifts);
	app.get('/gift', routes.views.gifts);
	app.get('/product-category/memberships', routes.views.customize);
	app.get('/checkout', routes.views.checkout);
	app.get('/cart', routes.views.cart);
	app.get('/thankYou', routes.views.thankYou);
	app.get('/brewerSignUp', routes.views.brewerSignUp);
	app.get('/dropahint', routes.views.dropahint);
	// app.get('/keystone', routes.views.keystoneSignIn);
	app.get('/collections/beer', routes.views.beercollection)
	app.get('/beer', routes.views.beers)
	// app.get('/market', routes.views.market);
	app.get('/success/homebrewersubmission', routes.views.success);
	app.get('/success/emailsignup', routes.views.success_email);
	app.get('/success/emailhomebrewer', routes.views.success_emailhomebrewer);
	app.get('/success/dropahint', routes.views.success_dropahint);
	app.get('/styleguide', routes.views.styleguide);
	app.get('/blog/brewers/mikeriddle/', routes.views.riddle);
	app.get('/blog/brewers/john-f', routes.views.fuller);
	app.get('/homebrewers/vote', routes.views.homebrewer_vote);
	app.get('/coworking', routes.views.index);

	app.get('/SFCraftBeerFestival/:source?', routes.views.landingpage_sfbeerfestival);
	app.get('/product-hunt', routes.views.index);
	app.get('/DiggBeer', routes.views.landingpage_digg);
	app.get('/DiggBeer-Noble-Brewer', routes.views.landingpage_diggB);
	app.get('/untappd/:location?', routes.views.landingpage_untappd);
	app.get('/untappd-:location?', routes.views.landingpage_untappd);
	app.get('/untappd/:location?/:version?/:source?', routes.views.landingpage_untappd);
	app.get('/untappdNB/:location?/:version?/:source?', routes.views.landingpage_untappdB);

	app.all('/contact', routes.views.contact);
	app.all('/market/:page?', routes.views.marketplace);
	app.all('/sampler', routes.views.sampler);
	app.all('/welcome', routes.views.welcomesampler);
	
	app.all('/VIPstatus', routes.views.member_referral);
	app.all('/VIPstatusB', routes.views.member_referral_b);
	app.all('/member', routes.views.member_statuspage);
	app.all('/member_referrals/status', routes.views.member_referrals_status);
	app.all('/api/member_referral', keystone.middleware.api, routes.api.member_referral);
	app.all('/api/member_pagehit', keystone.middleware.api, routes.api.member_pagehit);
	app.all('/api/waitlist_update', keystone.middleware.api, routes.api.waitlist_update);

	app.get('/nb/:shortURL?', routes.views.shortURL);
	app.get('/nbb/:shortURL?', routes.views.shortURLExternal);

	app.get('/twitch', routes.views.twitch);
	app.get('/yolo', routes.views.yolo);
	app.get('/yolos', routes.views.yolo_B);
	app.get('/exhilarist', routes.views.exhilarist);
	app.get('/love', routes.views.love);
	app.get('/orgorg', routes.views.orgorg);
	app.get('/blackfriday', routes.views.yolo);
	app.get('/beeradvocate', routes.views.beerAdvocate);
	app.get('/tastingcollective', routes.views.landingpage_tastingcollective);

	// Redirects
	// Add the url here and then in the redirect.js file
	app.get('/christmas_beer_and_feast_pairing', routes.views.redirect);
	app.get('/bloge', routes.views.redirect);
	app.get('/company', routes.views.redirect);
	app.get('/blog/batches/batch-1', routes.views.redirect);
	app.get('/blog/brewers/camino', routes.views.redirect);
	app.get('/blog/brewers/yerba-buena', routes.views.redirect);
	app.get('/brewers/john-f', routes.views.redirect);
	app.get('/company/contact', routes.views.redirect);
	app.get('/blog/giveaways/:contestName?', routes.views.redirect);




	// API Routes
	app.all('/api/hubspot', keystone.middleware.api, routes.api.hubspot);
	app.all('/api/email', keystone.middleware.api, routes.api.email);
	app.all('/api/addToMailchimp', keystone.middleware.api, routes.api.addToMailchimp);
	app.all('/api/hubspot/newcustomer', keystone.middleware.api, routes.api.newCustomerToMailchimp);
	app.all('/api/hubspot/neworder', keystone.middleware.api, routes.api.newOrderToMailchimp);
	app.all('/api/homebrewervote', keystone.middleware.api, routes.api.homebrewervote);
	app.all('/api/customer', keystone.middleware.api, routes.api.isShopifyCustomer);
	
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
	
};
