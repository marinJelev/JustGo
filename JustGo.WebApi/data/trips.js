'use strict';

var Trip = require('mongoose').model('Trip');
var Promise = require('bluebird');

module.exports = {
  create: function(trip) {
    var promise = new Promise(function(resolve, reject) {
      Trip.create(trip, function(err, dbTrip) {
        if (err) {
          reject(err);
        }

        if (!dbTrip) {
          reject('Trip could not be saved in database!');
        }

        resolve(dbTrip);
      });
    });

    return promise;
  }
};
