var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * Credit Model
 * ==========
 */

var Credit = new keystone.List('Credit', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: false }
});

Credit.add(  
 
    {
    user: { type: Types.Relationship, ref: 'User', initial: true },
    creditType: { type: Types.Select, options: ['Refund', 'Credit']},
		creditAmount: { type: Types.Money},
		creditNotes: { type: Types.Textarea, height: 50 },
		creditStatus: { type: Types.Select, options: ['Open', 'Fulfilled'], default: 'Open'},
		creditDate: { type: Types.Date, default: Date.now }
    }
);

Credit.defaultColumns = 'user, creditType, creditAmount, creditStatus, creditDate';
Credit.register();
