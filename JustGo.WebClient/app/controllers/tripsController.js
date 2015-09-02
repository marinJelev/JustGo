import httpRequester from '../utils/http-requester.js';
import Handlebars from '../../bower_components/handlebars/handlebars.js';

var TRIPS_URL = '../app/data/sampleTrips.json';
var TRIPS_TEMPLATE = 'app/templates/trips.handlebars';
var TRIPS_VIEW = 'app/views/tripsView.html';
var $TEMPLATE_TARGET = $('#main-content');

function init() {

    var promise = new Promise(function (resolve, reject) {
        httpRequester
            .get(TRIPS_URL, ' ')
            .then(function (data) {
                visualizeUserTripsData(data);
                resolve();
            });
    });

    return promise;
}

function visualizeUserTripsData(tripsData) {
    $.get(TRIPS_TEMPLATE, function (templateData) {
        var tripsTemplate = Handlebars.compile(templateData);
        var promise = new Promise(function (resolve, reject) {
            $.get(TRIPS_VIEW, function (data) {
                $TEMPLATE_TARGET.html(data + tripsTemplate(tripsData));
            });
            resolve();
        });
    });
}

$TEMPLATE_TARGET.on("click", "button", function (ev) {
    console.log('event fired');
    var divID = '#' + ev.target.id.split('-')[1];
    $(divID).toggle("slow");
});

export default {init};
