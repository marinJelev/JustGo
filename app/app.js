import $ from 'jquery';
//import globe from 'utils/globe.js';
//import service from 'services/getGeoLocationOfCityService.js';
import routie from 'routie';

routie('globe', function() {
    console.log('Im in globe');
    $('#main-content').load('app/views/globeView.html');
});

routie('login', function() {
    console.log('Im in login');
    $('#main-content').load('app/views/loginView.html');
});

routie('register', function() {
    console.log('Im in registration');
    $('#main-content').load('app/views/registrationView.html', function () {
        $('.alert').hide();
    });

});

routie('home', function() {
    console.log('In home page');
    $('#main-content').load('app/views/homePageView.html');
});

routie('*', function() {
    console.log('ne');
});
