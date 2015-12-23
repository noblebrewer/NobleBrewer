var keystone = require('keystone'),
  async = require('async');

exports = module.exports = function(req, res) {
  // Render the view
  var view = new keystone.View(req,res),
  locals = res.locals;
  if (req.params.page === 'fun') {
  	view.render('market-fun');
  } else if (req.params.page === 'homebrewing') {
  	view.render('market-homebrewing');
  } else if (req.params.page === 'samplers') {
  	view.render('market-samplers');
  } else if (req.params.page === 'giftbeer') {
  	view.render('market-giftbeer');
  } else if (req.params.page === 'resources') {
  	view.render('market-resources');
  } else if (req.params.page === 'craftbeer') {
  	view.render('market-craftbeer');
  } else if (req.params.page === 'other') {
  	view.render('market-other');
  } else {
	view.render('marketplace');
  }
    
};