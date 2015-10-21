var keystone = require('keystone');
var Types    = keystone.Field.Types;

/**
 * Campaign Model
 */

var Campaign = new keystone.List('Campaign', {
    autokey : { path:'slug', from:'name', unique:true },
    track : { createdAt:true, createdBy:true, updatedAt:true, updatedBy:true }
});


Campaign.add({
    user            : { type: Types.Relationship, ref: 'User', index: true }, // Owner
    name            : { type: String, required: true, index: true },
    uri             : { type: Types.Url, index: true },
    location        : { type: Types.Location }, //supports multiple inputs
    language        : { type: String, default: 'en-US', initial: true }, // for more specific localization
    about           : { type: Types.Markdown, height: 100 },
    rating          : { type: Types.Number, default: 0 },
    image           : { type: Types.CloudinaryImage },
    parent          : { type: Types.Relationship, ref: 'Campaign', initial: true }, //parent Campaign
    similar         : { type: Types.Relationship, ref: 'Campaign', many: true }, //similar Campaigns
    domains         : { type: Types.Relationship, ref: 'Domain', many: true },
    socials         : { type: Types.Relationship, ref: 'Social', many: true },
    type            : { type: Types.Relationship, ref: 'CampaignType', many: true, initial: true },
    tags            : { type: String, default: '' },
    status          : { type: Types.Select, options: 'private, public', initial: true, default: 'private' }
});

//display
Campaign.defaultColumns = 'name, user|20%, rating|20%, type|20%, language|20%';

//registration
Campaign.register();
