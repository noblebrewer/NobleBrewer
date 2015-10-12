var keystone = require('keystone'),
Types = keystone.Field.Types;
/**
* Beers Model
* ==========
*/
var Beers = new keystone.List('Beers', {
  map: { name: 'beer_name' },
  autokey: { path: 'slug', from: 'beer_name', unique: true },
  defaultSort: '-beer_name'
});
Beers.add({
    beer_name: { type: String },
    cover_photo: { type: Types.CloudinaryImage },
    all_beer_photo: { type: Types.CloudinaryImage },
    featured_beer_photo: { type: Types.CloudinaryImage }
});

Beers.relationship({ ref: 'Homebrewers', path: 'homebrewers', refPath: 'beer_name' });


Beers.defaultColumns = 'beer_name, cover_photo, all_beer_photo, featured_beer_photo';
Beers.register();
