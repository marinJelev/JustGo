'use strict';

var places = require('../data/places');

module.exports = {
  create: function(req, res) {
    var place = req.body;
    place.createdBy = req.user.username;

    places
      .create(place)
      .then(function(dbPlace) {
        res
          .status(200)
          .json({ success: true, place: dbPlace });
      })
      .catch(function(err) {
        res.json({ success: false, reason: err });
      });
  },
  getAll: function(req, res) {
    var user = req.user;

    places
      .getAll(user.username)
      .then(function(dbPlaces) {
        res
          .status(200)
          .json({ success: true, places: dbPlaces });
      })
      .catch(function(err) {
        res.json({ success: false, reason: err});
      });
  }
};
