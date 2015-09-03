'use strict';

var UsersController = require('./UsersController');
var AuthController = require('./AuthController');
var PlacesController = require('./PlacesController');
var TripsController = require('./PlacesController');

module.exports = {
  users: UsersController,
  auth: AuthController,
  places: PlacesController,
  trips: TripsController
};
