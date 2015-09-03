import httpRequester from 'utils/http-requester.js'
import identity from './identity.js';

var GOOGLE_MAPS_URL = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
var API_URL = 'http://localhost:3030/';
var ALL_COUNTRY_URL = 'app/data/country.json';

var saveTripUrl =  API_URL + '',
    savePlaceUrl = API_URL + 'places',
    getTripsUrl = API_URL + '',
    GetPlaceUrl = API_URL + '',
    token = identity.getToken();


function getCityByGeoLocation(lat, lang) {
    var url = GOOGLE_MAPS_URL + lat + ',' + lang + '&sensor=true';
    var promise = new Promise(function (resolve, reject) {
        httpRequester
            .get(url, false, false)
            .then(function (data) {
                resolve(data);
            });
    });

    return promise;
}

function getAllCountry() {
    var promise = new Promise(function (resolve, reject) {
        httpRequester
            .get(ALL_COUNTRY_URL, false, true)
            .then(function (data) {
                resolve(data);
            });
    });

    return promise;
}

function savePlace(place) {
    var promise = new Promise(function (resolve, reject) {
        httpRequester
            .post(savePlaceUrl, place, true, token)
            .then(function (data) {
                resolve(data);
            });
    });

    return promise;
}

function saveTrip(trip) {
    var promise = new Promise(function (resolve, reject) {
        httpRequester
            .post(saveTripUrl, trip, true, token)
            .then(function (data) {
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
