var keystone = require('keystone'),
Types = keystone.Field.Types;
/**
* Beers Model
* ==========
*/
var Beers = new keystone.List('Beers', {
  map: { name: 'beerName' },
  autokey: { path: 'slug', from: 'beerName', unique: true },
  defaultSort: '-brewerName'
});
Beers.add(
  {heading: 'Beer'},
  {
    beerName: { type: String, required: true, initial: true},
    beerType: { type: String },
    brewer: { type: Types.Relationship, ref: 'Homebrewer', index: true },
    beerImage: {type: Types.CloudinaryImage, required: false, initial: false },
    isFeaturedBeer: { type: Types.Boolean, required: false},
    initialQuantity: { type: Types.Number, required: false},
    currentQuantity: { type: Types.Number, required: false},
    releaseBatches: { type: Types.Relationship, ref: 'Release', index: true }
  },
  {heading: 'Beer Description'},
  {
    beerDescription: { type: Types.Textarea },
    flavorProfile: { type: Types.Select, options: 'Malty, Earthy, Aromatic, Sweet, Rich, Delicious', default: 'Delicious', index: true, many: true }
  }
  );

Beers.relationship({ ref: 'Releases', path: 'Releases', refPath: 'beersOfRelease'});

Beers.defaultColumns = 'beerName, brewerName, profileDate';
Beers.register();
