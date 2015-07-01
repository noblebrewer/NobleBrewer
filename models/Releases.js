var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * Releases Model
 * ==========
 */

var Releases = new keystone.List('Releases', {
  map: { name: 'dateOfRelease' },
  autokey: { path: 'slug', from: 'dateOfRelease', unique: true }
});

Releases.add(  
 
    {
      dateOfRelease: { type: Types.Date, required: true, initial: true },
      beersOfRelease: {  type: Types.Relationship, ref: 'Beers', many: true, initial: true },
      statusOfRelease: { type: Types.Select, options: ['Future', 'Complete'], default: 'Future', initial: true}
    }
);

Releases.relationship({ ref: 'User', path: 'User', refPath: 'Releases'});


Releases.defaultColumns = 'dateOfRelease|15%, statusOfRelease|20%, beersOfRelease';
Releases.register();
