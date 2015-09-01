import globe from 'utils/globe.js';
import geoLocationOfCityService from 'services/getGeoLocationOfCityService.js';
import globeHelper from 'utils/globeHelper.js';

var marker,
    map,
    spinning = false,
    wrapper = $('#wrapper');

function init() {
    var input = document.getElementById('pac-input'),
        searchBox = new google.maps.places.SearchBox(input);

    map = globe.init();

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

wrapper.on('click', '#spin', function () {
    spinning = !spinning;
    if (spinning) {
        globe.spin();
    } else {
        geoLocationOfCityService.getAllCountry(function (data) {
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

wrapper.on('click', '#random', function () {
    geoLocationOfCityService.getAllCountry(function (data) {
        var randomCountry = data[Math.random() * 250 | 0];
        var lat = randomCountry[1];
        var long = randomCountry[2];

        addMarker(lat, long);
        globe.panTo([lat, long]);
    });
});

function addMarker(lat, long) {
    var popUpInnerHtml,
        countryData;

    if (marker) {
        marker.removeFrom(map);
    }

    marker = WE.marker([lat, long]).addTo(map);
    geoLocationOfCityService.getCityByGeoLocation(lat, long, function (data) {

        countryData = data.results;
        popUpInnerHtml = globeHelper.popUpInnerHtml(countryData);
        marker.bindPopup(popUpInnerHtml, {maxWidth: 150, closeButton: true}).openPopup();
    });

    setTimeout(function () {
        $('.we-pp-close').removeAttr('href');
    }, 500)

}

export default {init};

