var keystone = require('keystone');

exports = module.exports = function(req, res) {
  // Render the view
  var shopify = keystone.get('shopify_hostname');
  res.redirect(shopify+'/pages/all-products');
};
