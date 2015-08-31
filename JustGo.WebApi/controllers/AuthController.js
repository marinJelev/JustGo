'use strict';

var passport = require('passport');

module.exports = {
  login: function(req, res, next) {
    var auth = passport.authenticate('local', function(err, user) {
      if (err) {
        return next(err);
      }

      if (!user) {
        res.status(401);
        res.json({ success: false, reason: 'Incorrect username or password!'});
      }

      req.login(user, function(err) {
        if (err) {
          return next(err);
        }

        res.status(200);
        res.json({
          success: true,
          user: {
            username: user.username
          }
        });
      });
    });

    auth(req, res, next);
  },
  logout: function(req, res) {
    req.logout();
    res.json({ success: true });
  },
  isAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      res.status(403);
      res.end();
    } else {
      next();
    }
  }
};
