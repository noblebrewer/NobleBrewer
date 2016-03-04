var keystone = require('keystone');

exports = module.exports = function(req, res) {
  // Render the view
	
  	console.log(req);
	var utms = {
		source : req.query.utm_source,
		medium : req.query.utm_medium,
		content : req.query.utm_content,
		campaign : req.query.utm_campaign
	}
	console.log(utms);
  var shopify = keystone.get('shopify_hostname');
  res.redirect(shopify+'/pages/twitch?utm_source='+utms.source+'&utm_medium='+utms.medium+'&utm_content='+utms.content+'&utm_campaign='+utms.campaign);
};
