var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * Order Model
 * ==========
 */

var Order = new keystone.List('Order', {
  map: { name: 'user' },
  autokey: { path: 'slug', from: 'user' , unique: true }
});

Order.add(  
 
    {
        user: { type: Types.Relationship, ref: 'User', initial: true },
        dateToShip: { type: Types.Date },
        dateOrderCreated: { type: Types.Date, default: Date.now },
        orderPriceTotal: { type: Types.Money },
        beerRelease: { type: Types.Relationship, ref: 'Releases' },
        orderStatus: { type: Types.Select, options: ['Prepaid', 'Refunded', 'Cancelled', 'Shipped', 'Processing', 'Unreleased', 'New'], default: 'New' },
        otherProducts: { type: Types.Select, options: ['T-shirt', 'Beer Mugs'] },
        OtherProductsPriceTotal: { type: Types.Money },
        individualBeers: {type: Types.Relationship, ref: 'beers', many: true },
        individualBeersPriceTotal: { type: Types.Money },
        isGift: {type: Types.Boolean },
        orderNotes: { type: Types.Textarea },
        deliveryNotes: { type: Types.Textarea },
        giftMessage: { type: Types.Textarea }

    }
);


Order.defaultColumns = 'user, dateToShip, orderStatus, isGift|5%';
Order.register();
