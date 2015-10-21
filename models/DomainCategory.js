var keystone = require('keystone');

/**
 * DomainCategory Model
 * ==================
 */

var DomainCategory = new keystone.List('DomainCategory', {
	autokey: { from: 'name', path: 'key', unique: true }
});

DomainCategory.add({
	name: { type: String, required: true }
});

DomainCategory.relationship({ ref: 'Domain', path: 'categories' });

DomainCategory.register();