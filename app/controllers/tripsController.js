import $ from 'jquery';

$.ajax({
    type: 'GET',
    url: 'app/data/sampleTrips.json',
    data: '',
    dataType: 'json',
    success: function (ajaxData) {

        $.get('app/views/tripsView.html', function (templateData) {
            var tripsTemplate = Handlebars.compile(templateData);

            $('#main-content').html(tripsTemplate(ajaxData));
        });

        $('#main-content').on("click", "button", function (ev) {
            var buttonId = '#' + ev.target.id.split('-')[1];

            $(buttonId).toggle("slow");
        });
    },
    error: function () {
        console.log('Error in ajax request!');
    }
});
