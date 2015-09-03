'use strict';

var Place = require('mongoose').model('Place');
var Promise = require('bluebird');

module.exports = {
  create: function(place) {
    var promise = new Promise(function(resolve, reject) {
      Place.create(place, function(err, dbPlace) {
        if (err) {
          reject();
        }

        if (!dbPlace) {
          reject();
        }

        resolve(dbPlace);
      });
    });

    return promise;
  }
};
