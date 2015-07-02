var keystone = require('keystone');

exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req,res),
        locals = res.locals;

    locals.section = 'beerProfile';
    locals.filters = {
        beerName : req.params.beerName
    };
    locals.data = {
        profiledBeers: []
    };

    view.on('init', function(next) {

        var q = keystone.list('Beers').model.findOne({
            slug: locals.filters.beerName
        });

        q.exec(function(err,result) {

        console.log('result ' + result);

            locals.data = result;

            next(err);

        });
    });
    
    // Render the view
    view.render('beerProfile');
    
};
