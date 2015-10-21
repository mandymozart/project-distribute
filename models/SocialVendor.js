var keystone = require('keystone');
var Types    = keystone.Field.Types;

/**
 * SocialVendor Model
 * ==================
 */

var SocialVendor = new keystone.List('SocialVendor', {
	autokey: { from: 'name', path: 'key', unique: true }
});

SocialVendor.add({
	name: { type: String, required: true },
	homepage: { type: String },
	baseUrl: { type: Types.Url }
});

SocialVendor.relationship({ ref: 'Social', path: 'vendor' });

SocialVendor.register();