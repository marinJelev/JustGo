import httpRequester from '../utils/http-requester.js';
import Handlebars from '../../bower_components/handlebars/handlebars.js';

var TRIPS_URL = '../app/data/samplePlaces.json';
var PLACES_TEMPLATE = 'app/templates/places.handlebars';
var PLACES_VIEW = 'app/views/placesView.html';
var $TEMPLATE_TARGET = $('#main-content');
var PLACES;
function init() {

    var promise = new Promise(function (resolve, reject) {
        httpRequester
            .get(TRIPS_URL, ' ')
            .then(function (data) {
                visualizeUserPlacesData(data);
                PLACES = data;
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

function visualizeMap(placeID) {
    var place, location, myOptions, map, i;

    for (i = 0; i < PLACES.length; i += 1) {
        if (PLACES[i]._id == placeID) {
            place = PLACES[i];
        }
    }

    location = new google.maps.LatLng(place.latitude, place.longitude);

    myOptions = {
        zoom: 10,
        center: location,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById(placeID), myOptions);

    google.maps.event.addListenerOnce(map, 'idle', function () {
        google.maps.event.trigger(map, 'resize');
        map.setCenter(location);
    });
}

$TEMPLATE_TARGET.on("click", "a", function (ev) {
    var id = ev.target.id.split('-')[1];
    $('#' + id).toggle();
    visualizeMap(id);
});

export default {init}
