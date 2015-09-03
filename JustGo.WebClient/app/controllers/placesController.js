import persister from '../services/persister.js';
import templateGenerator from 'utils/templateGenerator.js';
import map from 'utils/map.js';

var PLACES_VIEW = 'app/views/placesView.html';
var $TEMPLATE_TARGET = $('#main-content');
var places;

function init() {

    persister
        .getPlaces()
        .then(function (data) {
            places = data.places;
            templateGenerator
                .get(PLACES_VIEW)
                .then(function (template) {
                    $TEMPLATE_TARGET.html(template(places));
                });
        })
}

function visualizeMap(placeId) {
    var place, location, myOptions, map, i;

    for (i = 0; i < places.length; i += 1) {
        if (i == placeId) {
            place = places[i];
        }
    }

    location = new google.maps.LatLng(place.latitude, place.longitude);

    myOptions = {
        zoom: 10,
        center: location,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById(placeId), myOptions);

    google.maps.event.addListenerOnce(map, 'idle', function () {
        google.maps.event.trigger(map, 'resize');
        map.setCenter(location);
    });
}

$TEMPLATE_TARGET.on('click', '#places-view a', function (ev) {
    var id = ev.target.id.split('-')[1];
    $('#' + id).toggle();
    visualizeMap(id);
});

export default {init}
