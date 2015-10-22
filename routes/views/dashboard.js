var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	var user = req.user;

	console.log(user);
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'dashboard';
	
	// Render the view
	view.render('dashboard');
	
};
