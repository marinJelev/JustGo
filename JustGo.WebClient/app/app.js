import $ from 'jquery';
import routie from 'routie';
import bootstrap from 'bootstrap';

import auth from 'services/auth.js';
import identity from 'services/identity.js';
import homeController from 'controllers/homeController.js';
import registerController from 'controllers/registerController.js';
import loginController from 'controllers/loginController.js';
import globeController from 'controllers/globeController.js';

routie('/home',  homeController.init);
routie('/register',  registerController.init);
routie('/login', loginController.init);

routie('/globe', function() {
    if (!identity.getCurrentUser()) {
        routie('/home');
        return;
    }

    $('#main-content').load('app/views/globeView.html', globeController.init);
});

routie('*', function() {
    routie('/home');
});

$('#logout').on('click', function(ev) {
    ev.preventDefault();

    auth
        .logout()
        .then(function() {
            routie('/home', homeController.init);
        });
});

routie('/home');
