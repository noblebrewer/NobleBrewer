var keystone = require('keystone'),
	Types = keystone.Field.Types;

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Set locals
	locals.section = 'blog';
	locals.filters = {
		post: req.params.post
	};
	locals.data = {
		posts: [],
		featuredPosts: []
	};
	

	// Load all posts
	view.on('init', function(next) {
		
		var q = keystone.list('Post').model.find().where('state', 'published').sort('-publishedDate').populate('author').where('isFeatured', 'false');
		
		q.exec(function(err, results) {
			//console.log(results);
			locals.data.posts = results;
			next(err);
		});
		
	});

	view.on('init', function(next) {
		
		var q = keystone.list('Post').model.find().where('state', 'published').sort('-publishedDate').populate('author').where('isFeatured', 'true');
		
		q.exec(function(err, results) {
			//console.log(results);
			locals.data.featuredPosts = results;
			next(err);
		});
		
	});
	
	// Render the view
	view.render('blog');
	
};