'use strict';

var mongoose = require('mongoose');

module.exports.init = function() {
  var placeSchema = mongoose.Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    name: { type: String, required: true },
    createdBy: { type: String, required: true }
  });

  mongoose.model('Place', placeSchema);
};
