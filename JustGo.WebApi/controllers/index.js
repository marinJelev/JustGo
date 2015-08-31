'use strict';

var UsersController = require('./UsersController');
var AuthController = require('./AuthController');

module.exports = {
    users: UsersController,
    auth: AuthController
};
