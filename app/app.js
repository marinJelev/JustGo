import $ from 'jquery';
 //import globe from 'utils/globe.js';
 //import service from 'services/getGeoLocationOfCityService.js';
import routie from 'routie';

console.log(routie);


routie('globe', function() {
  console.log('Im in globe');
  $('#main-content').load('app/views/globeView.html');
});

routie('login', function() {
  console.log('Im in login');
  $('#main-content').load('app/views/loginView.html');
});

routie('', function() {
  console.log('Home View');
});

routie('*', function() {
console.log('ne');
});

