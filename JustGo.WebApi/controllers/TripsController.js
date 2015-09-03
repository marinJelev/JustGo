'use strict';

var trips = require('../data/trips');

module.exports = {
  create: function(req, res) {
    var trip = req.body;
    trip.createdBy = req.user.username;

    trips
      .create(trip)
      .then(function(dbTrip) {
        res
          .status(200)
          .json({ success: true, place: dbTrip });
      })
      .catch(function(err) {
        res
          .status(401)
          .json({ success: false, reason: err });
      });
  },
  getAll: function(req, res) {
    var user = req.user;

    trips
      .getAll(user.username)
      .then(function(dbTrips) {
        res
          .status(200)
          .json({ success: true, trips: dbTrips });
      })
      .catch(function(err) {
        res.json({ success: false, reason: err});
      });
  }
};
