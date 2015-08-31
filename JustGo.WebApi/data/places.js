'use strict';

var Place = require('mongoose').model('Place');

module.exports = {
  create: function(place, callback) {
    Place.create(place, callback);
  }
};
