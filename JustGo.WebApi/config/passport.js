'use strict';

var passport = require('passport'),
    LocalPassport = require('passport-local'),
    User = require('mongoose').model('User');

module.exports = function() {
  passport.use(new LocalPassport(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      if (!user.isValidPassword(password)) {
        return done(null, false);
      }

      return done(null, user);
    });
  }));

  passport.serializeUser(function(user, done) {
    if (user) {
      return done(null, user._id);
    }
  });

   passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
