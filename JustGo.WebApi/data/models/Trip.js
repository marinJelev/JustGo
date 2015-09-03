'use strict';

var mongoose = require('mongoose');

module.exports.init = function() {
  var tripSchema = mongoose.Schema({
    from: { type: {}, required: true },
    to: { type: {}, required: true },
    waypoints: { type: [{}] },
    createdBy: { type: String, required: true }
  });

  mongoose.model('Trip', tripSchema);
};
