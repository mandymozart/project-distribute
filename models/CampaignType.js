var keystone = require('keystone');

/**
 * CampaignType Model
 * ==================
 */

var CampaignType = new keystone.List('CampaignType', {
	autokey: { from: 'name', path: 'key', unique: true }
});

CampaignType.add({
	name: { type: String, required: true }
});

CampaignType.relationship({ ref: 'Campaign', path: 'type' });

CampaignType.register();