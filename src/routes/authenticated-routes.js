// Routes in this module require authentication

import express from 'express';

const router = express.Router();

// Controls whether this web app will require authentication and authorization.
const AUTH_REQUIRED = (process.env.AUTH_REQUIRED === 'true');

// middleware that is specific to this router
router.use((req, res, next) => {
	if (req.isAuthenticated() || !AUTH_REQUIRED) {
		return next();
	}
	return res.redirect(`/auth/forcedotcom?redirect=${req.originalUrl}`);
});

router.get('/register', (req, res) => {
	return res.render('register');
});

router.get('/sign-in', (req, res) => {
	return res.render('sign-in');
});

router.get('/', (req, res) => {
	return res.render('index');
});

module.exports = router;
