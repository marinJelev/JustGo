System.config({
    baseURL: '/app',
    transpiler: 'babel',
    map: {
      babel: '../node_modules/babel-core/browser.js',
      jquery: '../bower_components/jquery/dist/jquery.js',
      routie: '../bower_components/routie/dist/routie.js',
      bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.js'
    }
});
