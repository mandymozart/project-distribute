var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	var user = req.user;
	console.log(user);
	
	// Set locals
	locals.section = 'campaigns';

	locals.filters = {
		type: req.params.type
	};
	locals.data = {
		campaigns: [],
		types: []
	};
	

	// Load all types
	view.on('init', function(next) {
		
		keystone.list('CampaignType').model.find().sort('name').exec(function(err, results) {
			
			if (err || !results.length) {
				return next(err);
			}
			
			locals.data.types = results;
			
			// Load the counts for each type
			async.each(locals.data.types, function(type, next) {
				
				keystone.list('Campaign').model.count().where('type').in([type.id]).exec(function(err, count) {
					type.campaignCount = count;
					next(err);
				});
				
			}, function(err) {
				next(err);
			});
			console.log(locals.data);
		});
		
	});
	
	// Load the current type filter
	view.on('init', function(next) {
		
		if (req.params.type) {
			keystone.list('CampaignType').model.findOne({ key: locals.filters.type }).exec(function(err, result) {
				locals.data.type = result;
				next(err);
			});
		} else {
			next();
		}
	});
	
	// Load the campaigns
	view.on('init', function(next) {
		
		var q = keystone.list('Campaign').paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 10
			})
			.sort('createdAt')
			.populate('user type');

		if (locals.data.type) {
			q.where('type').in([locals.data.type]);
		}
		// Todo: add public campaigns to query
		q.where('user', user);


		q.exec(function(err, results) {
			locals.data.campaigns = results;
			next(err);
		});
		
	});
	console.log(locals.data);
	// Render the view
	view.render('campaigns');
	
};