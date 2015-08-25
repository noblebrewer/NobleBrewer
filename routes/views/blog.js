var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	// Render the view
  	var blog = keystone.get('blog_hostname');
	res.redirect(blog+'/');
};
