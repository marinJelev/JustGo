'use strict';

var mongoose = require('mongoose');

module.exports.init = function() {
  var userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }
  });

  userSchema.method({
    isValidPassword: function(password) {
      return password === this.password;
    }
  });

  mongoose.model('User', userSchema);
};
