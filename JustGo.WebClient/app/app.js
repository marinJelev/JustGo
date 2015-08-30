import $ from 'jquery';
//import globe from 'utils/globe.js';
//import service from 'services/getGeoLocationOfCityService.js';
import routie from 'routie';
import loginController from 'loginController';
import registrationController from 'registrationController';
import tripsController from 'tripsController';

routie('globe', function() {
    console.log('Im in globe');
    $('#main-content').load('app/views/globeView.html');
});

routie('login', function() {
    console.log('Im in login');
    $('#main-content').load('app/views/loginView.html', loginController.init);
});

routie('register', function() {
    console.log('Im in registration');
    $('#main-content').load('app/views/registrationView.html', registrationController.init);
});

routie('home', function() {
    console.log('In home page');
    $('#main-content').load('app/views/homePageView.html');
});

//routie('*', function() {
//    console.log('ne');
//});

routie('*', function () {
    tripsController.init();
});
