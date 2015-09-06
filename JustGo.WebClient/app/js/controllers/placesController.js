import templateGenerator from '../utils/templateGenerator.js';
import map from '../utils/map.js';
import identity from '../utils/identity.js';
import placesData from '../data/places.js';

var PLACES_VIEW = 'app/views/placesView.html';
var $TEMPLATE_TARGET = $('#main-content');
var places;

function init() {
    if (!identity.getCurrentUser()) {
        routie('/home');
        return;
    }

    placesData
        .getAll()
        .then(function (data) {
            places = data.places;
            templateGenerator
                .get(PLACES_VIEW)
                .then(function (template) {
                    $TEMPLATE_TARGET.html(template(places));
                });
        })
}

function visualizeMap(placeId) {
    var place, location, myOptions, map, i;

    for (i = 0; i < places.length; i += 1) {
        if (i == placeId) {
            place = places[i];
        }
    }

    location = new google.maps.LatLng(place.latitude, place.longitude);

    myOptions = {
        zoom     : 10,
        center   : location,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById(placeId), myOptions);

    var marker = new google.maps.Marker({
        position: location,
        map     : map
    });

    google.maps.event.addListenerOnce(map, 'idle', function () {
        google.maps.event.trigger(map, 'resize');
        map.setCenter(location);
    });

    //TextSearch to get the google place_id,then perform getDetails serach to get to Photos array
    //counter of hours lost to get this to work - 30hrs. Thanks Google...

    var service = new google.maps.places.PlacesService(map);
    service.textSearch({
        location: {lat: place.latitude, lng: place.longitude},
        radius  : 100000,
        query   : 'hotel'
    }, callback);

    function callback(results, status) {
        var requestDetails = {
                placeId: ''
            },
            googlePlaceId,
            photo,
            link,
            photoLinks = [];

        if (status === google.maps.places.PlacesServiceStatus.OK) {

            for (var i = 0; i < results.length; i++) {
                googlePlaceId = results[i].place_id;
                requestDetails.placeId = googlePlaceId;
            }
            var service = new google.maps.places.PlacesService(map);
            service.getDetails(requestDetails, function (googlePlace, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    var result = googlePlace;
                    if (result.photos && result.photos.length > 2) {
                        for (var j = 0; j < result.photos.length; j += 1) {
                            photo = result.photos[j];
                            link = photo.getUrl({maxWidth: 400});
                            photoLinks.push(link);
                        }
                        showGooglePlacePhotos(place._id, photoLinks);
                    }
                    else {
                        showStreetViewImages(place.placeId);
                    }
                }
            });
        }
    }
}

$TEMPLATE_TARGET.on('click', '#places-view a', function (ev) {
    var id = ev.target.id.split('-')[1];
    $('#' + id).toggle();
    visualizeMap(id);
});

function showStreetViewImages(id) {
    var newLatitude = places[id].latitude += 0.003,
        newLongitude = places[id].longitude += 0.003,
        imageTwo = $('#img2' + id),
        newLocation = 'https://maps.googleapis.com/maps/api/streetview?size=350x350&location=' + newLatitude + ',' + newLongitude + '&heading=100&pitch=8&scale=2&key=AIzaSyCP9uz6zrR6jTUMHtHjodwa_a-EQaWcAJ4';

    imageTwo.attr('src', newLocation);
    $('#img1' + id).toggle();
    imageTwo.toggle();
}

function showGooglePlacePhotos(id, photoLinks){

    var imageOne = $('#img3' + id).attr('src', photoLinks[0]);
    imageOne.toggle();

    var imageTwo = $('#img4' + id).attr('src', photoLinks[1]);
    imageTwo.toggle();

}

export default {
    init
}
