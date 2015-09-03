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
}

function calculateAndDisplayRoute(trip) {
    var locationFrom = new google.maps.LatLng(trip.locationFrom.lat, trip.locationFrom.long);
    var locationTo = new google.maps.LatLng(trip.locationTo.lat, trip.locationTo.long);
    var directionPanel = document.getElementById('directions-panel');
    var wayPoints = trip.locationsThrough.map(function(wayPoint){

        return {
            location: {
                lat: parseFloat(wayPoint.lat),
                lng: parseFloat(wayPoint.long)
            }
        };
    });

    directionsDisplay.setPanel(directionPanel);
    map.panTo(locationFrom);

    directionsService.route({
        origin: locationFrom,
        destination: locationTo,
        waypoints: wayPoints,
        travelMode: google.maps.TravelMode['DRIVING']
    }, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            $(directionPanel).hide();
        }
    });
}

export default {init, calculateAndDisplayRoute}
