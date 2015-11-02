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
	app.get('/team', routes.views.team);
	app.get('/faq', routes.views.faq);
	app.get('/press', routes.views.press);
	app.get('/releases', routes.views.releases);
	app.get('/user', routes.views.user);
	app.get('/subscription', routes.views.customize);
	app.get('/gifts', routes.views.gifts);
	app.get('/product-category/memberships', routes.views.customize);
	app.get('/checkout', routes.views.checkout);
	app.get('/cart', routes.views.cart);
	app.get('/thankYou', routes.views.thankYou);
	app.get('/brewerSignUp', routes.views.brewerSignUp);
	app.get('/dropahint', routes.views.dropahint);
	app.get('/keystone', routes.views.keystoneSignIn);
	app.get('/collections/beer', routes.views.beercollection)
	// app.get('/market', routes.views.market);
	app.get('/success/homebrewersubmission', routes.views.success);
	app.get('/success/emailsignup', routes.views.success_email);
	app.get('/success/emailhomebrewer', routes.views.success_emailhomebrewer);
	app.get('/success/dropahint', routes.views.success_dropahint);
	app.get('/styleguide', routes.views.styleguide);
	app.get('/blog/brewers/mikeriddle/', routes.views.riddle);
	app.get('/blog/brewers/john-f', routes.views.fuller);
	app.get('/homebrewers/vote', routes.views.homebrewer_vote);
	app.get('/DiggBeer', routes.views.landingpage_digg);
	app.get('/DiggBeer-Noble-Brewer', routes.views.landingpage_diggB);
	app.get('/untappd/:location?', routes.views.landingpage_untappd);
	app.get('/untappd-:location?', routes.views.landingpage_untappd);

	app.all('/contact', routes.views.contact);


	// API Routes
	app.all('/api/hubspot', keystone.middleware.api, routes.api.hubspot);
	app.all('/api/email', keystone.middleware.api, routes.api.email);
	app.all('/api/addToMailchimp', keystone.middleware.api, routes.api.addToMailchimp);
	app.all('/api/hubspot/newcustomer', keystone.middleware.api, routes.api.newCustomerToMailchimp);
	app.all('/api/homebrewervote', keystone.middleware.api, routes.api.homebrewervote);
	app.all('/api/customer', keystone.middleware.api, routes.api.isShopifyCustomer);

	
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
	
};
