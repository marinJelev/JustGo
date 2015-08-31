'use strict';

var express = require('express');

var app = express();
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];

require('./config/express')(app);
require('./config/mongoose')(config);
require('./config/passport')();
require('./config/routes')(app, config);

app.listen(config.port, function() {
  console.log('Server running on port: ' + config.port);
  console.log('Enviroment: ' + env);
});
