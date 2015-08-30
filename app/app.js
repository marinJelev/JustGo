import $ from 'jquery';
//import Handlebars from '../bower_components/handlebars/handlebars.min.js';
//import globe from 'utils/globe.js';
//import service from 'services/getGeoLocationOfCityService.js';
//import routie from 'routie';

$.ajax({
    type: 'GET',
    url: 'app/data/sampleTrips.json',
    data: '',
    dataType: 'json',
    success: function (ajaxData) {

        $.get('app/views/tripsView.html', function (templateData) {
            var tripsTemplate = Handlebars.compile(templateData);

            $('#main-content').html(tripsTemplate(ajaxData));
        });

        $('#main-content').on("click", "button", function (ev) {
            var buttonId = '#' + ev.target.id.split('-')[1];

            $(buttonId).toggle("slow");
        });
    },
    error: function () {
        console.log('Error in ajax request!');
    }
});


//console.log(routie);
//
//
//routie('globe', function() {
//  console.log('Im in globe');
//  $('#main-content').load('app/views/globeView.html');
//});
//
//routie('login', function() {
//  console.log('Im in login');
//  $('#main-content').load('app/views/loginView.html');
//});
//
//routie('register', function() {
//    console.log('Im in registration');
//    $('#main-content').load('app/views/registrationView.html');
//});
//
//routie('', function() {
//  console.log('Home View');
//});
//
//routie('*', function() {
//console.log('ne');
//});

