import globe from 'utils/globe.js';
import geoLocationOfCityService from 'services/getGeoLocationOfCityService.js';

var marker;
var spinning = false;
var map;
function init() {

   map =  globe.init();

   map.on('click', function (e) {
        if (!e.latlng) {
            return;
        }

        addMarker(e.latlng.lat, e.latlng.lng);
    });

    $('#spin').click(function () {
        spinning = !spinning;
        if (spinning) {
            globe.spin();
        } else {
            geoLocationOfCityService.getAllCountry(function (data) {
                console.log(data);
                console.log(data.length);
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

    $('#random').click(function () {
        geoLocationOfCityService.getAllCountry(function (data) {
            console.log(data);
            console.log(data.length);
            var randomCountry = data[Math.random() * 250 | 0];
            var lat = randomCountry[1];
            var long = randomCountry[2];

            addMarker(lat, long);

            globe.panTo([lat, long]);
        });
    });

    //google maps Search input
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);

    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        places.forEach(function(place) {
            console.log(place);
            var lat = place.geometry.location.G;
            var long =place.geometry.location.K;

            globe.panTo([lat, long]);
            addMarker(lat, long)
        });
    });
}

function addMarker(lat, long) {
    if (marker) {
        marker.removeFrom(map);
    }

    var countryData;

    marker = WE.marker([lat, long]).addTo(map);
    console.log(lat, long);
    geoLocationOfCityService.getCityByGeoLocation(lat, long, function (data) {
        console.log(data);
        countryData = data.results;
        var countryDataLastIndex = countryData.length - 1;

        console.log(countryData[countryDataLastIndex]);
        marker.bindPopup("<b>Country: " + countryData[countryDataLastIndex]['formatted_address'] +
            "</b><br>State: " + countryData[countryDataLastIndex - 1]['formatted_address'] +
            " <br /><span style='font-size:10px;color:#999'>City: " + countryData[countryDataLastIndex - 2]['formatted_address'] +
            "</span>", {maxWidth: 150, closeButton: true}).openPopup();
    });
}

export default {init};

