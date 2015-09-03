'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

module.exports.init = function() {
  var userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accessToken: { type: String }
  });

  userSchema.methods.hasValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  mongoose.model('User', userSchema);
};
