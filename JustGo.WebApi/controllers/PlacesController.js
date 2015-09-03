'use strict';

var places = require('../data/places');

module.exports = {
  create: function(req, res) {
    var place = req.body;
    place.createdBy = req.user.username;

    places.create(place, function(err, place) {
      if (err) {
        res
          .status(401)
          .json({ success: false, reason: err });
      }

      res
        .status(200)
        .json({ success: true, place: place });
    });
  }
};
