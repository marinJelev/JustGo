var directionsDisplay;
var directionsService;
var map;

function init() {
    directionsDisplay = new google.maps.DirectionsRenderer;
    directionsService = new google.maps.DirectionsService;
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {
            lat: 42.6954322,
            lng: 23.3239467
        }
    });

    directionsDisplay.setMap(map);
}

function calculateAndDisplayRoute(trip) {
    var locationFrom = new google.maps.LatLng(trip.from.latitude, trip.from.longitude);
    var locationTo = new google.maps.LatLng(trip.to.latitude, trip.to.longitude);
    var directionPanel = document.getElementById('directions-panel');
    var wayPoints = trip.waypoints.map(function(wayPoint) {

        return {
            location: {
                lat: parseFloat(wayPoint.latitude),
                lng: parseFloat(wayPoint.longitude)
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
    }, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            $(directionPanel).hide();
        }
    });
}

export default {
    init, calculateAndDisplayRoute
}
