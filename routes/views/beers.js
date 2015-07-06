var keystone = require('keystone');

exports = module.exports = function(req, res) {
  
  var view = new keystone.View(req,res),
  locals = res.locals;

  locals.section = 'beers';
  locals.filters = {
    featuredBeers: []
  };

  locals.data = {
    allBeers: []
  };


  view.on('init', function(next) {
    var q = keystone.list('Beers').model.find().where('isFeaturedBeer', true)

    q.exec(function(err, result) {
      locals.filters.featuredBeers = result;
      next(err);
    });

  });

  view.on('init', function(next) {

    var q = keystone.list('Beers').model.find().sort('-beerName')

    q.exec(function(err,results) {

      locals.data.allBeers = results;
      next(err);

    });
  });

  console.log(locals.data.allBeers);
    // Render the view
    view.render('beers');
    
  };
