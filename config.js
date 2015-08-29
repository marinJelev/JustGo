(function() {
  'use strict';

  System.config({
    baseURL: '/app',
    transpiler: 'babel',
    map: {
      babel: '../node_modules/babel-core/browser.js',
      jquery: '../bower_components/jquery/dist/jquery.js',
      jqueryRoutes: '../bower_components/jquery-routes/jquery.routes.js'
    }
  });
}());