'use strict';

var controllers = require('../controllers');

module.exports = function(app) {
  app.post('/users', controllers.users.create);

  app.post('/login', controllers.auth.login);
  app.post('/logout', controllers.auth.authenticate, controllers.auth.logout);

  app.post('/places', controllers.auth.authenticate, controllers.places.create);
  app.get('/places', controllers.auth.authenticate, controllers.places.getAll);

  app.post('/trips', controllers.auth.authenticate, controllers.trips.create);
  app.get('/trips', controllers.auth.authenticate, controllers.trips.getAll);
};
