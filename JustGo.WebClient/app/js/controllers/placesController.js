import templateGenerator from '../utils/templateGenerator.js';
import map from '../utils/map.js';
import identity from '../utils/identity.js';
import placesData from '../data/places.js';

var PLACES_VIEW = 'app/views/placesView.html';
var $TEMPLATE_TARGET = $('#main-content');
var places;

function init() {
    if (!identity.getCurrentUser()) {
        routie('/home');
        return;
    }

    placesData
        .getAll()
        .then(function(data) {
            places = data.places;
            templateGenerator
                .get(PLACES_VIEW)
                .then(function(template) {
                    $TEMPLATE_TARGET.html(template(places));
                });
        });
}

function showStreetViewImages(id) {
    var newLatitude = places[id].latitude += 0.003,
        newLongitude = places[id].longitude += 0.003,
        imageTwo = $('#img2' + id),
        newLocation = 'https://maps.googleapis.com/maps/api/streetview?size=350x350&location=' + newLatitude + ',' + newLongitude + '&heading=100&pitch=8&scale=2&key=AIzaSyCP9uz6zrR6jTUMHtHjodwa_a-EQaWcAJ4';

    imageTwo.attr('src', newLocation);
    $('#img1' + id).toggle();
    imageTwo.toggle();
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

    var marker = new google.maps.Marker({
        position: location,
        map: map
    });

    google.maps.event.addListenerOnce(map, 'idle', function() {
        google.maps.event.trigger(map, 'resize');
        map.setCenter(location);
    });
}

$TEMPLATE_TARGET.on('click', '#places-view a', function(ev) {
    var id = ev.target.id.split('-')[1];
    $('#' + id).toggle();
    visualizeMap(id);
    showStreetViewImages(id);
});

export default {
    init
}
