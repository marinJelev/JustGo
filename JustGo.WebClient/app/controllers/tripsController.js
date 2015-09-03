import persister from '../services/persister.js';
import Handlebars from '../../bower_components/handlebars/handlebars.js';
import templateGenerator from 'utils/templateGenerator.js';
import map from 'utils/map.js';

var TRIPS_TEMPLATE = 'app/views/trips.html';
var $TEMPLATE_TARGET = $('#main-content');
var trips = [];
var $tripsContainer;
var $directionPanel;

function init() {
    $('#main-content').load('app/views/tripsView.html', bindEvents);
}

function bindEvents() {
    $tripsContainer = $('#trips-container');
    persister
        .getTrips()
        .then(function (data) {
            trips = data;
            templateGenerator
                .get(TRIPS_TEMPLATE)
                .then(function (template) {
                    $tripsContainer.html(template(data));
                });

        });

    map.init();
    $directionPanel = $('#directions-panel');
    $directionPanel.hide();
}

$TEMPLATE_TARGET.on('click', '#trips-view button', function (ev) {
    var index = ev.target.id.split('-')[1];
    var divId = '#' + index;
    var $tripDetails = $(divId);
    $directionPanel.show();
    $tripDetails.toggle("slow")
        .first()
        .html($directionPanel);
    map.calculateAndDisplayRoute(trips[index - 1])
});

export default {init};
