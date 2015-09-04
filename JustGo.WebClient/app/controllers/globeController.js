import globe from 'utils/globe.js';
import notifier from '../utils/notifier.js';
import persister from '../services/persister.js';
import templateGenerator from 'utils/templateGenerator.js';

var PLACE_SUCCESSFULLY_SAVED_MESSAGE = 'Place successfully saved!',
    URL = {
        POPUP: 'app/views/globePopUp.html',
        PLACE: 'app/views/globePlace.html'
    };

var marker,
    map,
    spinning = false,
    $wrapper = $('#wrapper'),
    place,
    places,
    trip,
    $tripContainer,
    $placeContainer;

function init() {
    var input = document.getElementById('pac-input'),
        searchBox = new google.maps.places.SearchBox(input);

    place = {};
    places = [];
    $tripContainer = $('#trip-container');
    $placeContainer = $('#place-container');
    map = globe.init();
    $tripContainer.hide();

    map.on('click', function(e) {
        if (!e.latlng) {
            return;
        }

        addMarker(e.latlng.lat, e.latlng.lng);
    });

    //google maps Search input
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length === 0) {
            return;
        }

        places.forEach(function(place) {
            var lat = place.geometry.location.G;
            var long = place.geometry.location.K;

            globe.panTo([lat, long]);
            addMarker(lat, long);
        });
    });

    bindEvents();
}

function bindEvents() {
    $wrapper.on('click', '#spin', function() {
        spinning = !spinning;
        if (spinning) {
            globe.spin();
        } else {
            persister
                .getAllCountry()
                .then(function(data) {
                    var position = setMarkerOnRandomPosition(data);

                    globe.spin();

                    setTimeout(function() {
                        globe.panTo(position);
                    }, 50);
                });
        }
    });

    $wrapper.on('click', '#random', function() {
        persister
            .getAllCountry()
            .then(function(data) {
                var position = setMarkerOnRandomPosition(data);

                globe.panTo(position);
            });
    });

    $wrapper.on('click', '#add-place', function() {
        addPlace(place);
    });

    $wrapper.on('click', '.save-place', function() {
        var $this = $(this);
        var $parentLi = $this.closest('li');
        var index = $parentLi.attr('data-id') - 1;

        var place = places[index];

        persister
            .savePlace(place)
            .then(function(data) {
                notifier.alertSuccess(PLACE_SUCCESSFULLY_SAVED_MESSAGE);
            })
            .catch(function(err) {
                notifier.alertError(err);
            });
    });

    $wrapper.on('click', '.remove-place', function() {
        var $this = $(this);
        var $parentLi = $this.closest('li');
        var index = $parentLi.attr('data-id') - 1;

        $placeContainer.remove($parentLi);
        place.space(index, 1);
    });

    $wrapper.on('click', '#save-trip', function() {
        var trip = places.slice(),
            data = {
                from: trip.shift(),
                to: trip.pop(),
                waypoints: trip
            };
        persister
            .saveTrip(data)
            .then(function(data) {});
    });

    $wrapper.on('click', '#remove-all', function() {
        places = [];
        $placeContainer.html('');
        $tripContainer.hide();
    });
}

function setMarkerOnRandomPosition(data) {
    var randomCountry = data[Math.random() * 250 | 0];
    var lat = randomCountry[1];
    var long = randomCountry[2];

    addMarker(lat, long);

    return [lat, long];
}

function addPlace(place) {
    places.push(place);

    var templateObject = {
        name: place.name,
        latitude: place.latitude,
        longitude: place.longitude,
        id: places.length
    };

    templateGenerator
        .get(URL.PLACE)
        .then(function(template) {
            $placeContainer.append(template(templateObject));
        });

    if (places.length == 1) {
        $tripContainer.slideDown();
    }
}

function addMarker(lat, long) {
    var countryData;

    if (marker) {
        marker.removeFrom(map);
    }

    marker = WE.marker([lat, long]).addTo(map);
    persister
        .getCityByGeoLocation(lat, long)
        .then(function(data) {
            countryData = data.results;
            var countryDataLastIndex = countryData.length - 1;
            place = {
                country: countryData[countryDataLastIndex].formatted_address,
                state: countryData[countryDataLastIndex - 1].formatted_address,
                name: countryData[countryDataLastIndex - 2].formatted_address,
                latitude: lat,
                longitude: long
            };

            templateGenerator
                .get(URL.POPUP)
                .then(function(template) {
                    marker.bindPopup(template(place), {maxWidth: 150, closeButton: true}).openPopup();
                });
        });

    setTimeout(function () {
        $('.we-pp-close').removeAttr('href');
    }, 500);
}

export default { init };
