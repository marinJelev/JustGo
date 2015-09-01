import httpRequester from 'utils/http-requester.js'

var GOOGLE_MAPS_URL = "http://maps.googleapis.com/maps/api/geocode/json?latlng=",
    SAVE_TRIP = '',
    SAVE_PLACE = 'http://localhost:3030/places',
    GET_TRIPS = '',
    GET_PLACES = '';

function getCityByGeoLocation(lat, lang) {
    var url = GOOGLE_MAPS_URL + lat + ',' + lang + '&sensor=true';
    var promise = new Promise(function(resolve, reject) {
        $.get(url, function(data) {
                resolve(data);
            });
    });

    return promise;
}

function getAllCountry() {
    var url = 'app/data/country.json';
    var promise = new Promise(function(resolve, reject) {
        httpRequester
            .get(url)
            .then(function(data) {
                resolve(data);
            });
    });

    return promise;
}

function savePlace(place) {
    var promise = new Promise(function(resolve, reject) {
        httpRequester
            .post(SAVE_PLACE, place)
            .then(function(data) {
                resolve(data);
            });
    });

    return promise;
}

function saveTrip(trip) {
    var promise = new Promise(function(resolve, reject) {
        httpRequester
            .post(SAVE_TRIP, trip)
            .then(function(data) {
                resolve(data);
            });
    });

    return promise;
}

export default {
    getCityByGeoLocation,
    getAllCountry,
    savePlace,
    saveTrip
};
// }(jQuery));
