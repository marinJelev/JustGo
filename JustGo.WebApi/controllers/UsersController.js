'use strict';

var users = require('../data/users');
var bcrypt = require('bcrypt');

module.exports = {
  create: function(req, res) {
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

    var salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    user.accessToken = '';

    users
      .create(user)
      .then(function(dbUser) {
        res.json({
          success: true,
          user: {
            username: dbUser.username,
            id: dbUser._id
          }
        });
      })
      .catch(function(err) {
        res.json({ success: false, reason: err });
      });
  }
};
