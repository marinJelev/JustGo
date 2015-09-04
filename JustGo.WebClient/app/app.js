import $ from 'jquery';
import routie from 'routie';
import bootstrap from 'bootstrap';

import auth from 'js/utils/auth.js';
import identity from 'js/utils/identity.js';
import homeController from 'js/controllers/homeController.js';
import registerController from 'js/controllers/registerController.js';
import loginController from 'js/controllers/loginController.js';
import placesController from 'js/controllers/placesController.js';
import tripsController from 'js/controllers/tripsController.js';
import globeController from 'js/controllers/globeController.js';

routie('/home', homeController.init);
routie('/register', registerController.init);
routie('/login', loginController.init);
routie('/places', placesController.init);
routie('/trips', tripsController.init);

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
