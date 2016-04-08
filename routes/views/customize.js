var keystone = require('keystone');

exports = module.exports = function(req, res) {
  // Render the view
  console.log(req.query);
  var shopify = keystone.get('shopify_hostname');
  if (req.query.source) {
  	res.redirect(shopify+'/pages/subscription?source='+req.query.source)
  } else {
  	res.redirect(shopify+'/pages/subscription');
  }
};
