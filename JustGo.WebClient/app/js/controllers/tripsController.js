import templateGenerator from '../utils/templateGenerator.js';
import map from '../utils/map.js';
import identity from '../utils/identity.js';
import tripsData from '../data/trips.js';

var URL = {
    TRIPS_TEMPLATE: 'app/views/trips.html',
    TRIPS_VIEW: 'app/views/tripsView.html'
};
var $tripsContainer,
    $directionPanel,
    trips = [],
    $mainContent = $('#main-content');

function init() {
    if (!identity.getCurrentUser()) {
        routie('/home');
        return;
    }

    templateGenerator
        .get(URL.TRIPS_VIEW)
        .then(function (template) {
            $mainContent.html(template());
        })
        .then(function () {
            return tripsData
                .getAll()
        })
        .then(function (data) {
            trips = data.trips;
        })
        .then(function () {
            return templateGenerator
                .get(URL.TRIPS_TEMPLATE)
        })
        .then(function (template) {
            $tripsContainer = $('#trips-container');
            $tripsContainer.html(template(trips));
        })
        .then(function () {
            bindEvents();
        });
}

function bindEvents() {
    map.init();
    $directionPanel = $('#directions-panel');
    $directionPanel.hide();
}

$mainContent.on('click', '#trips-view button', function (ev) {
    var index = ev.target.id.split('-')[1];
    var divId = '#' + index;
    var $tripDetails = $(divId);
    $directionPanel.show();
    $tripDetails.toggle("slow")
        .first()
        .html($directionPanel);

    map.calculateAndDisplayRoute(trips[index])
});

export default {
    init
};
