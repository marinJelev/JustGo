'use strict';

var mongoose = require('mongoose');
var models = require('../data/models');

module.exports = function(config) {
  mongoose.connect(config.dbConnection);
  var db = mongoose.connection;

  db.on('error', function(err) {
    db.on('error', console.error('Connection error: ' + err));
  });

  db.once('open', function() {
    console.info('MongoDB up and running...');
  });

  models.UserModel.init();
  models.PlaceModel.init();
  models.TripModel.init();
};
