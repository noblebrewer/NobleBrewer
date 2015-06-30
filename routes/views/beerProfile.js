var keystone = require('keystone');

exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req,res),
        locals = res.locals;

    locals.section = 'beerProfile';
    locals.data = {
        allBeers: []
    };

    view.on('init', function(next) {

        var q = keystone.list('Beers').model.find().sort('-beerName')

        q.exec(function(err,results) {

            locals.data.allBeers = results;
            next(err);

        });
    });
    // Render the view
    view.render('beerProfile');
    
};
