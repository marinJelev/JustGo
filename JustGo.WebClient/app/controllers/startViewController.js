function init() {
    var tooltipID;
    console.log('Controller loaded!');

    $('#img-start-container')
        .on('mouseover', 'img', function (ev) {
            tooltipID = '#tooltip-' + ev.target.id.split('-')[1];
            $(tooltipID).toggle('slow');
        })
        .on('mouseout', 'img', function (ev) {
            tooltipID = '#tooltip-' + ev.target.id.split('-')[1];
            $(tooltipID).toggle('slow');
        });
}

export default {init};
