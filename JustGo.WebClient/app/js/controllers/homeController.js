import identity from '../utils/identity.js';

function init() {
    var currentUser = identity.getCurrentUser();

    if (currentUser) {
        $('#user-name-logged').html('Hello, ' + usernameToProperCase(currentUser));
        $('.authorized').show();
        $('.unauthorized').hide();
    } else {
        $('.authorized').hide();
        $('.unauthorized').show();
    }

    $('#main-content').load('app/views/homeView.html', bindEvents);
}

function bindEvents() {
    var $carouselItem = $('.carousel .item');

    $carouselItem.each(function() {
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        for (var i = 0; i < 4; i++) {
            next = next.next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));
        }
    });
    $(".home-buttons").hover(function() {
        $(this).css("background-color", " #375a7f");
        $(this).css("transform", "scale(1.5)");
    }, function() {
        $(this).css("background-color", "");
        $(this).css("transform", "scale(1)");
    });
}

function usernameToProperCase(username) {
    return username.charAt(0).toUpperCase() + username.substr(1).toLowerCase();
}

export default {
    init
};
