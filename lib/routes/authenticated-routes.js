'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// Controls whether this web app will require authentication and authorization.
// Routes in this module require authentication

var AUTH_REQUIRED = process.env.AUTH_REQUIRED === 'true';

// middleware that is specific to this router
router.use(function (req, res, next) {
	if (req.isAuthenticated() || !AUTH_REQUIRED) {
		return next();
	}
	return res.redirect('/auth/forcedotcom?redirect=' + req.originalUrl);
});

router.get('/register', function (req, res) {
	return res.render('register');
});

router.get('/sign-in', function (req, res) {
	return res.render('sign-in');
});

router.get('/', function (req, res) {
	return res.render('index');
});

module.exports = router;