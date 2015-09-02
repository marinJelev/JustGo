import httpRequester from '../utils/http-requester.js';

var TRIPS_URL = '../app/data/sampleTrips.json';
var TRIPS_TEMPLATE = 'app/views/tripsView.html';
var $TEMPLATE_TARGET = $('#main-content');

function init() {

    var promise = new Promise(function(resolve, reject) {
        httpRequester
            .get(TRIPS_URL, ' ')
            .then(function(data) {
                visualizeUserTripsData(data);
            });
    });

    return promise;
}

function visualizeUserTripsData(tripsData){
    $.get(TRIPS_TEMPLATE, function (templateData) {
        var tripsTemplate = Handlebars.compile(templateData);
        $TEMPLATE_TARGET.html(tripsTemplate(tripsData));
    });

    $TEMPLATE_TARGET.on("click", "button", function (ev) {
        var buttonId = '#' + ev.target.id.split('-')[1];
        $(buttonId).toggle("slow");
    });
}

export default {init};