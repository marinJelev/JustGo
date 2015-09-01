import identity from '../services/identity.js';

function init() {
    if (identity.getCurrentUser()) {
        $('.authorized').show();
        $('.unauthorized').hide();
    } else {
        $('.authorized').hide();
        $('.unauthorized').show();
    }

    $('#main-content').load('app/views/homeView.html');

}

export default {
    init
};
