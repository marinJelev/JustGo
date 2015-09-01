import globe from 'utils/globe.js';
import persister from '../services/persister.js';
import globeHelper from 'utils/globeHelper.js';

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

    map.on('click', function (e) {
        if (!e.latlng) {
            return;
        }

        addMarker(e.latlng.lat, e.latlng.lng);
    });

    //google maps Search input
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        places.forEach(function (place) {
            var lat = place.geometry.location.G;
            var long = place.geometry.location.K;

            globe.panTo([lat, long]);
            addMarker(lat, long)
        });
    });
}

$wrapper.on('click', '#spin', function () {
    spinning = !spinning;
    if (spinning) {
        globe.spin();
    } else {
        persister.getAllCountry(function (data) {
            var randomCountry = data[Math.random() * 250 | 0];
            var lat = randomCountry[1];
            var long = randomCountry[2];

            addMarker(lat, long);
            globe.spin();

            setTimeout(function () {
                globe.panTo([lat, long]);
            }, 50)
        });
    }
});

$wrapper.on('click', '#random', function () {
    persister
        .getAllCountry()
        .then(function (data) {
            var randomCountry = data[Math.random() * 250 | 0];
            var lat = randomCountry[1];
            var long = randomCountry[2];

            addMarker(lat, long);
            globe.panTo([lat, long]);
        });
});

$wrapper.on('click', '#add-place', function () {
    console.log(place);
    addPlace(place);
});

$wrapper.on('click', '.save-place', function () {
    var $this = $(this);
    var $parentLi = $this.closest('li');
    var index = $parentLi.attr('data-id') - 1;

    var place = places[index];

    persister
        .savePlace(place)
        .then(function (data) {
            console.log(data);
        });
});


$wrapper.on('click', '.remove-place', function () {
    var $this = $(this);
    var $parentLi = $this.closest('li');
    var index = $parentLi.attr('data-id') - 1;

    $placeContainer.remove($parentLi);
    place.space(index, 1);
});

$wrapper.on('click', '#save-trip', function () {
    var trip = places.slice(),
        data = {
            from: trip.splice(0, 1),
            to: trip.splice(places.length - 1, 1),
            waypoints: trip
        };

    //save to server;
});

$wrapper.on('click', '#remove-all', function () {
    places = [];
    $placeContainer.html('');
    $tripContainer.hide();

});

function addPlace(place) {
    places.push(place);

    var placeHtml = globeHelper.placeHtml(place, places.length);
    $placeContainer.append(placeHtml);

    if (places.length == 1) {
        $tripContainer.slideDown();
    }
}

function addMarker(lat, long) {
    var popUpInnerHtml,
        countryData;

    if (marker) {
        marker.removeFrom(map);
    }

    marker = WE.marker([lat, long]).addTo(map);
    persister
        .getCityByGeoLocation(lat, long)
        .then(function (data) {
            console.log(data);
            countryData = data.results;
            place = {
                name: countryData[countryData.length - 2].formatted_address,
                latitude: lat,
                longitude: long
            };

            popUpInnerHtml = globeHelper.popUpInnerHtml(countryData);
            marker.bindPopup(popUpInnerHtml, {maxWidth: 150, closeButton: true}).openPopup();
        });

    setTimeout(function () {
        $('.we-pp-close').removeAttr('href');
    }, 500)

}

export default {init};

