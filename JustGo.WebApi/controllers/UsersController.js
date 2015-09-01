'use strict';

var users = require('../data/users');

module.exports = {
  create: function(req, res) {
    var user = req.body;

    users.create(user, function(err, user) {
      if (err) {
        res.status(400);
        res.json({ success: false, reason: err });
      }

      res.status(200);
      res.json({
        success: true,
        user: {
          username: user.username
        }
      });
    });
  }
};
