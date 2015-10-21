var keystone = require('keystone');
var Types    = keystone.Field.Types;

/**
 * Social Model
 */

var Social = new keystone.List('Social', {
    autokey : { path:'slug', from:'name', unique:true },
    track : { createdAt:true, createdBy:true, updatedAt:true, updatedBy:true }
});


Social.add({
    user            : { type: Types.Relationship, ref: 'User', index: true }, // Owner
    name            : { type: String, required: true, index: true },
    vendor          : { type: Types.Relationship, ref: 'SocialVendor', required: true, initial: true, index: true, many: true, default: ''},
    value           : { type: String, required: true, initial: true },
    uri             : { type: Types.Url, index: true },
    location        : { type: Types.Location }, //supports multiple inputs
    language        : { type: String, default: 'en-US' }, // for more specific localization
    about           : { type: Types.Markdown, height: 100 },
    rating          : { type: Types.Number, default: 0 },
    image           : { type: Types.CloudinaryImage },
    domains         : { type: Types.Relationship, ref: 'Domain', many: true, initial: true },
    parent          : { type: Types.Relationship, ref: 'Social', many: true, initial: true },
    tags            : { type: String, default: '' },
    status          : { type: Types.Select, options: 'private, public', initial: true, default: 'public' }
});

//display
Social.defaultColumns = 'name, user|20%, rating|20%, vendor|20%, language|20%';

//registration
Social.register();
