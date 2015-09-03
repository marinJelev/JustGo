'use strict';

var users = require('../data/users');
var randomToken = require('random-token');

module.exports = {
  login: function(req, res) {
    var user = req.body;

    if (!user.username) {
      res
        .status(401)
        .json({ success: false, reason: 'Username is required!'});

      return;
    }

    if (!user.password) {
      res
        .status(401)
        .json({ success: false, reason: 'Pasword is required!'});

      return;
    }

    users
      .findByUsername(user.username)
      .then(function (dbUser) {
        if (!(dbUser.hasValidPassword(user.password))) {
          res
            .status(401)
            .json({ success: false, reason: 'Invalid password!'});

          return;
        }

        if (!dbUser.token) {
          dbUser.token = randomToken(80);
          dbUser.save();
        }

        res.json({
          success: true,
          user: {
            username: dbUser.username,
            token: dbUser.token
          }
        });

      })
      .catch(function (err) {
        res.json({ success: false, reason: err });
      });
  },
  authenticate: function(req, res, next) {
    var token = req.headers['X-Access-Token'];

    users
      .findByToken(token)
      .then(function(dbUser) {
        req.user = dbUser.username;
        next();
      })
      .catch(function(err) {
        res
          .status(401)
          .json({ success: false, reason: err });
      });
  },
  logout: function(req, res) {
    var user = req.user;

    users
      .findByUsername(user)
      .then(function(dbUser) {
        dbUser.token = '';
        dbUser.save();
        res.json({ success: true });
      })
      .catch(function(err) {
        res
          .status(401)
          .json({ success: false, reason: err });
      });
  }
};
