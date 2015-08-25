var keystone = require('keystone'),
  async = require('async');

exports = module.exports = function(req, res) {
  // Render the view
  var shopify = keystone.get('shopify_hostname');
  res.redirect(shopify+'/collections/all');
};


  
