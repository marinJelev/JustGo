System.config({
    baseURL: '/app',
    transpiler: 'babel',
    map: {
      babel: '../node_modules/babel-core/browser.js',
      jquery: '../bower_components/jquery/dist/jquery.js',
      routie: '../bower_components/routie/dist/routie.js',
      bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.js',
      handlebars: '../bower_components/handlebars/handlebars.js',
      cryptojs: '../node_modules/crypto-js/crypto-js.js'
    }
});
