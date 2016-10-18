var keystone = require('keystone'),
  async = require('async');

exports = module.exports = function(req, res) {
	var shopify = keystone.get('shopify_hostname');

	if (req.url == "/christmas_beer_and_feast_pairing") {
		res.redirect("/blog")
	} else if (req.url == "/bloge") {
		res.redirect("/blog")
	} else if (req.url == "/company") {
		res.redirect("/")
	} else if (req.url == "/blog/batches/batch-1") {
		res.redirect("/blog")
	} else if (req.url == "/blog/brewers/camino") {
		res.redirect("/profile/camino")
	} else if (req.url == "/blog/brewers/yerba-buena") {
		res.redirect("/profile/yerba-buena")
	} else if (req.url == "/brewers/john-f") {
		res.redirect("/profile/jonathan-fuller")
	} else if (req.url == "/company/contact") {
		res.redirect("/contact")
	}  else if (req.params.contestName) {
		res.redirect("/")
	}


	// // Render the view
	
	// res.redirect(shopify+'/collections/beer');
};