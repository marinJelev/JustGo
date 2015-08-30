// var geoLocationOfCityService = (function ($) {
var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=";

function getCityByGeoLocation(lat, lang, succes) {
    var currentUrl = url + lat + ',' + lang + '&sensor=true';
    $.get(currentUrl, succes);
}

function getAllCountry(succes) {
    var url = 'app/data/country.json';
    $.get(url, succes);
}

export default {
    getCityByGeoLocation,
    getAllCountry
};
// }(jQuery));
