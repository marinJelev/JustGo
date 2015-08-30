'use strict';

var controllers = require('../controllers');

module.exports = function(app) {
  app.post('/users/register', controllers.users.register);
};
