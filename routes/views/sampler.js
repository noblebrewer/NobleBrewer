var keystone = require('keystone');

exports = module.exports = function(req, res) {
  // Render the view
  var shopify = keystone.get('shopify_hostname');
  // Put the current sampler link here:
  res.redirect(shopify+'/products/northern-california-ipa-sampler');
};
