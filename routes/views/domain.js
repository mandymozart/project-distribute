var keystone = require('keystone');
var async = require('async');

// Todo: Early Prototype

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	var user = req.user;
	
	// Set locals
	locals.section = 'domain';
	locals.page = req.params.domain;

	locals.filters = {
		category: req.params.domain
	};
	locals.data = {
		domain: [],
		socials: [],
		vendor: []
	};
	

	// Load all vendors
	view.on('init', function(next) {
		// ????????????????????????????? -->
		keystone.list('SocialVendor').model.find().sort('name').exec(function(err, results) {
			
			if (err || !results.length) {
				return next(err);
			}
			
			locals.data.vendors = results;
			
			// Load the counts for each vendor
			async.each(locals.data.vendors, function(vendor, next) {
				
				keystone.list('Domain').model.count().where('category').in([vendor.id]).exec(function(err, count) {
					category.domainCount = count;
					next(err);
				});
				
			}, function(err) {
				next(err);
			});
		});
		// ????????????????????????? <--
		
	});
	
	// Load the current category filter
	view.on('init', function(next) {
		
		if (req.params.category) {
			keystone.list('DomainCategory').model.findOne({ key: locals.filters.category }).exec(function(err, result) {
				locals.data.category = result;
				next(err);
				console.log(locals.data.category);
			});
		} else {
			next();
		}
	});
	
	// Load the Domains
	view.on('init', function(next) {
		
		var q = keystone.list('Domain').paginate({
				page: req.query.page || 1,
				perPage: 20,
				maxPages: 10
			})
			.sort('createdAt')
			.populate('user category');

		if (locals.data.category) {
			q.where('category').in([locals.data.category]);
		}
		// Todo: add public & user Domains to query
		//q.where('user', user);
		//console.log(locals.data);

		q.exec(function(err, results) {
			locals.data.domains = results;
			next(err);
		});
		
	});

	// Render the view
	view.render('Domains');
	
};