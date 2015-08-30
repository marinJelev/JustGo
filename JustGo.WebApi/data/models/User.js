'use strict';

var mongoose = require('mongoose');

module.exports.init = function() {
  var userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    hashPass: { type: String, required: true },
    email: { type: String, required: true }
  });

  mongoose.model('User', userSchema);
};
