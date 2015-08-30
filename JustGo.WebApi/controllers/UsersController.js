'use strict';

var users = require('../data/users');

module.exports = {
  register: function(req, res) {
    var user = req.body;

    users.create(user, function(err, user) {
      if (err) {
        res.status(400);
        res.send({ success: false, reason: err });
      }

      res.status(200);
      res.send({
        success: true,
        user: {
          id: user._id,
          username: user.username
        }
      });
    });
  }
};
