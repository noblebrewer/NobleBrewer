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
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {
	
	// Views
	app.get('/', routes.views.index);
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
	app.get('/checkout', routes.views.checkout);
	app.get('/thankYou', routes.views.thankYou);
	app.get('/brewerSignUp', routes.views.brewerSignUp);
	app.get('/keystone', routes.views.keystoneSignIn);
	app.get('/market', routes.views.market);
	app.all('/contact', routes.views.contact);


	
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
	
};
