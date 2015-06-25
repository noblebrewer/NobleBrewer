var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * Beers Model
 * ==========
 */

var Beers = new keystone.List('Beers', {
  map: { name: 'beerName' },
  autokey: { path: 'slug', from: 'beerName', unique: true }
});

Beers.add(  
  {heading: 'Beer'},
    {
      beerTitle: { type: String },
      beerName: { type: String, required: true, initial: true},
      brewerName: { type: String, required: true, initial: true},
      beerImage: {type: Types.CloudinaryImage, required: false, initial: false },
      isFeaturedBeer: { type: Types.Boolean, required: false}
    },
  {heading: 'Beer Profile'},
    {
      profileTitle: { type: String },
      profileAuthor: { type: Types.Name },
      profileBody: { type: Types.Textarea },
      flavorProfile: { type: Types.Select, options: 'Malty, Earthy, Aromatic, Sweet, Rich, Delicious', default: 'Delicious', index: true },
      profileDate: { type: Types.Date, default: Date.now }
    }
);

Beers.schema.virtual('content.full').get(function() {
  return this.content.extended || this.content.brief;
});

Beers.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Beers.register();
