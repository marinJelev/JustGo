'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    rootPath: rootPath,
    port: 3030,
    dbConnection: 'mongodb://justgo:hemingwayspecial@ds041613.mongolab.com:41613/justgoproduction'
  },
  production: {
    rootPath: rootPath,
    port: process.env.PORT || 3030,
    dbConnection: 'mongodb://justgo:hemingwayspecial@ds041613.mongolab.com:41613/justgoproduction'
  }
};
