'use strict';

var controllers = require('../controllers');

module.exports = function(app) {
  app.post('/users', controllers.users.create);

  app.post('/login', controllers.auth.login);
  app.post('/logout', controllers.auth.authenticate, controllers.auth.logout);

  app.post('/places', controllers.auth.authenticate, controllers.places.create);

  // /* for testing purposes */
  // app.get('/', function(req, res) {
  //   res.sendFile(config.rootPath + '/public/index.html');
  // });

  // app.get('/me', function(req, res) {
  //   res.json({ user: req.user });
  // });
};
