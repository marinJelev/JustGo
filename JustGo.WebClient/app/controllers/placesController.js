import httpRequester from '../utils/http-requester.js';
import Handlebars from '../../bower_components/handlebars/handlebars.js';

var TRIPS_URL = '../app/data/samplePlaces.json';
var PLACES_TEMPLATE = 'app/templates/places.handlebars';
var PLACES_VIEW = 'app/views/placesView.html';
var $TEMPLATE_TARGET = $('#main-content');

function init() {

    var promise = new Promise(function (resolve, reject) {
        httpRequester
            .get(TRIPS_URL, ' ')
            .then(function (data) {
                visualizeUserPlacesData(data);
                resolve();
            });
    });

    return promise;
}

function visualizeUserPlacesData(placesData) {
    $.get(PLACES_TEMPLATE, function (templateData) {
        var placesTemplate = Handlebars.compile(templateData);
        var promise = new Promise(function (resolve, reject) {
            $.get(PLACES_VIEW, function (data) {
                $TEMPLATE_TARGET.html(data + placesTemplate(placesData));
            });
            resolve();
        })
    });
}

$TEMPLATE_TARGET.on("click", "a", function (ev) {
    var divID = '#' + ev.target.id.split('-')[1];
    console.log('mode details clicked');
    console.log(divID);
    $(divID).toggle("slow");
});

export default {init}
