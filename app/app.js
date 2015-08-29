import $ from 'jquery';

import routes from 'jqueryRoutes';
 //import globe from 'utils/globe.js';
 //import service from 'services/getGeoLocationOfCityService.js';

$.routes.add('/home', function() {
  console.log('Home View');
});

$.routes.add('/globe', function() {
  $('#main-content').load('app/views/globeView.html');
});

$.routes.add('/login', function() {
  $('#main-content').load('app/views/loginView.html');
});

$.routes.add('/registration', function() {
  $('#main-content').load('app/views/registrationView.html');
});

$('main-content').load('app/views/registrationView.html', function(){

});