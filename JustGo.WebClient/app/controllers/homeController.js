import identity from '../services/identity.js';

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

    $('#main-content').load('app/views/homeView.html');

}

function usernameToProperCase(username){
    return username.charAt(0).toUpperCase() + username.substr(1).toLowerCase()
}

export default {
    init
};
