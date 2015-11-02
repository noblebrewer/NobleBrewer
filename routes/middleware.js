/**
 * This file contains the common middleware used by your routes.
 * 
 * Extend or replace these functions as your application requires.
 * 
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

var _ = require('underscore');


/**
	Initialises the standard view locals
	
	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/

exports.initLocals = function(req, res, next) {
	
	var locals = res.locals;
	
	locals.navLinks = [
		{ label: 'Homebrewers',	key: 'brewers',		href: '/brewers' },
		{ label: 'Beer',		key: 'beers',		href: '/beers' },
		// { label: 'Market',		key: 'market',		href: '/market' },
		{ label: 'Subscription',key: 'subscription',href: '/subscription' },
		{ label: 'Gifts',key: 'gifts',href: '/gifts' },
		//Sign Up link in the header is coming from the header.ejs
	];
	
    locals.footerLinks = [
		{ label: 'Home',			key: 'home',		href: '/' },
		{ label: 'About',	key: 'about',		href: '/about' },
		// { label: 'Blog',		key: 'blog',		href: '/blog' },
		{ label: 'Brewery Map - Beta',		key: 'breweries',		href: 'http://breweries.noblebrewer.com' },
        // { label: 'Team',		key: 'team',		href: '/team' },
        { label: 'FAQ',         key: 'faq',         href: '/faq' },
        { label: 'Legal',		key: 'terms',		href: '/terms' },
        { label: 'Press',		key: 'press',		href: '/press' },
        { label: 'Contact',		key: 'contact',		href: '/contact' },
	];
    
	locals.user = req.user;
	locals.env = process.env;
	
	next();
	
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {
	
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	
	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;
	
	next();
	
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {
	
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
	
};
