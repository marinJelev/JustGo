import httpRequester from '../utils/http-requester.js';
import Handlebars from '../../bower_components/handlebars/handlebars.js';
import templateGenerator from 'utils/templateGenerator.js';

var TRIPS_URL = '../app/data/sampleTrips.json';
var TRIPS_TEMPLATE = 'app/templates/trips.handlebars';
var $TEMPLATE_TARGET = $('#main-content');
var trips = [];
var $tripsContainer;

function init() {
    $('#main-content').load('app/views/tripsView.html', bindEvents);
}

function bindEvents() {
    $tripsContainer = $('#trips-container');
    httpRequester
        .get(TRIPS_URL)
        .then(function (data) {
            trips = data;
            templateGenerator
                .get(TRIPS_TEMPLATE)
                .then(function (template) {
                    $tripsContainer.html(template(data));
                });

        });
}

$TEMPLATE_TARGET.on("click", "button", function (ev) {
    console.log('event fired');
    var divID = '#' + ev.target.id.split('-')[1];
    $(divID).toggle("slow");
});

export default {init};
