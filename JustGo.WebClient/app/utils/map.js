var directionsDisplay;
var directionsService;
var map;

function init() {
    directionsDisplay = new google.maps.DirectionsRenderer;
    directionsService = new google.maps.DirectionsService;
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: 42.6954322, lng: 23.3239467}
    });
    directionsDisplay.setMap(map);

    //calculateAndDisplayRoute(directionsService, directionsDisplay);
    //document.getElementById('mode').addEventListener('change', function() {
    //    calculateAndDisplayRoute(directionsService, directionsDisplay);
    //});
}

function calculateAndDisplayRoute(trip) {
    var locationFrom = new google.maps.LatLng(trip.locationFrom.lat, trip.locationFrom.long);
    var locationTo = new google.maps.LatLng(trip.locationTo.lat, trip.locationTo.long);
    //var wayPoints = trip.locationsThrough.map(function(location){
    //    return {
    //        lat: parseFloat(location.lat),
    //        lng: parseFloat(location.long)
    //    };
    //  //  return new google.maps.LatLng(location.lat, location.long);
    //});
    console.log(locationFrom)
    console.log( wayPoints)
    map.panTo(locationFrom);

    directionsService.route({
        origin: locationFrom,
        destination: locationTo,
     //   waypoints: wayPoints,
        travelMode: google.maps.TravelMode['DRIVING']
    }, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
export default {init, calculateAndDisplayRoute}
