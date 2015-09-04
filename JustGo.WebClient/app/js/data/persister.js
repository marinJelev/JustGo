import httpRequester from '../utils/http-requester.js';
import identity from '../utils/identity.js';

var GOOGLE_MAPS_URL = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
var ALL_COUNTRY_URL = 'app/data/country.json';
var token = identity.getToken();

function getCityByGeoLocation(lat, lang) {
    var url = GOOGLE_MAPS_URL + lat + ',' + lang + '&sensor=true';
    var promise = new Promise(function(resolve, reject) {
        httpRequester
            .get(url, false, false)
            .then(function(data) {
                resolve(data);
            })
            .catch(function(err) {
                reject(err);
            });
    });

    return promise;
}

function getAllCountry() {
    var promise = new Promise(function(resolve, reject) {
        httpRequester
            .get(ALL_COUNTRY_URL, false, true)
            .then(function(data) {
                console.log(data)
                resolve(data);
            })
            .catch(function(err) {
                reject(err);
            });
    });

    return promise;
}

export default {
    getCityByGeoLocation, getAllCountry
};
