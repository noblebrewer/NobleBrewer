var keystone = require('keystone');

exports = module.exports = function(req, res) {
  // Render the view
  var hostname = keystone.get('hostname');
  res.redirect(hostname+'/profile/mike-riddle');
};
