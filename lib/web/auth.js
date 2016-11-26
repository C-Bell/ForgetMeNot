'use strict';

var passport = require('passport');
var ForceDotComStrategy = require('passport-forcedotcom').Strategy;

var AUTH_REQUIRED = process.env.AUTH_REQUIRED === 'true';

module.exports = function module(app) {
  return {
    init: function init() {
      passport.serializeUser(function (user, done) {
        done(null, user);
      });

      passport.deserializeUser(function (obj, done) {
        done(null, obj);
      });

      // Use the ForceDotComStrategy within Passport
      var sfStrategy = new ForceDotComStrategy({
        clientID: process.env.CF_CLIENT_ID,
        clientSecret: process.env.CF_CLIENT_SECRET,
        callbackURL: process.env.CF_CALLBACK_URL,
        authorizationURL: process.env.SF_AUTHORIZE_URL,
        tokenURL: process.env.SF_TOKEN_URL,
        profileFields: ['user_id', 'first_name']
      }, function (accessToken, refreshToken, profile, done) {
        var profileDetails = profile;

        // Only retain the profile properties we need.
        profileDetails.user_id = profileDetails._raw.user_id;
        delete profileDetails._raw;
        delete profileDetails.displayName;
        delete profileDetails.name;
        delete profileDetails.emails;

        return done(null, profile);
      });

      passport.use(sfStrategy);

      app.use(passport.initialize());
      app.use(passport.session());
    },
    registerRoutes: function registerRoutes() {
      app.get('/auth/forcedotcom', function (req, res, next) {
        if (req.query.redirect) {
          req.session.authRedirect = req.query.redirect;
          passport.authenticate('forcedotcom')(req, res, next);
        }
      });

      app.get('/auth/forcedotcom/callback', passport.authenticate('forcedotcom', {
        failureRedirect: '/error'
      }), function (req, res) {
        // res.redirect('/');
        var redirect = req.session.authRedirect;
        if (redirect) {
          delete req.session.authRedirect;
        }
        res.redirect(303, redirect || '/');
      });

      app.get('/', function (req, res) {
        if (!req.user && AUTH_REQUIRED) {
          req.session.destroy();
          req.logout();
          return res.redirect('/auth/forcedotcom');
        }
        res.render('index');
      });

      app.get('/logout', function (req, res) {
        req.logout();
        req.session.destroy();
        return res.render('logout');
      });
    },
    ensureAuthenticated: function ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated() || !AUTH_REQUIRED) {
        return next();
      }
      res.redirect('/auth/forcedotcom?redirect=\'' + req.originalUrl);
    }
  };
};