'use strict';

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

module.exports = function(app) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(session({
    secret: 'hemingway special just go web api',
    resave: true,
    saveUninitialized: true
  }));
};
