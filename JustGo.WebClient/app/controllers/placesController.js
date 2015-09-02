import httpRequester from '../utils/http-requester.js';

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

export default {init}
