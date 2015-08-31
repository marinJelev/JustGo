import $ from 'jquery';
import routie from 'routie';
import bootstrap from 'bootstrap';

import identity from 'services/identity.js';
import homeController from 'controllers/homeController.js';
import loginController from 'controllers/loginController.js';
// import registrationController from 'controllers/registrationController.js';
import globeController from 'controllers/globeController.js';

$('#menu-authorised').hide();
$('#menu-unauthorised').hide();

routie('/home', function() {
    $('#main-content').load('app/views/homeView.html');
});

routie('register', function() {
    $('#main-content').load('app/views/registrationView.html', registrationController.init);
});

routie('/login', function() {

    if (identity.getCurrentUser()) {
        routie('/dashboard');
        return;
    }

    $('#main-content').load('app/views/loginView.html', loginController.init);
});

routie('/dashboard', function() {
    $('#main-content').load('app/views/dashboardView.html');
});

routie('/globe', function() {
    $('#main-content').load('app/views/globeView.html', globeController.init);
    // $('.container').css('position', 'relative');
});

routie('*', function() {
    routie('/home');
});

routie('/home');

if (identity.getCurrentUser()) {
    $('#menu-authorised').toggle();
} else {
    $('#menu-unauthorised').toggle();
}
