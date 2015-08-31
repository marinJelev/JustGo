import identity from '../services/identity.js';

function init() {
    if (identity.getCurrentUser()) {
        $('#menu-authorised').toggle();
    } else {
        $('#menu-unauthorised').toggle();
    }
}

export default { init };

// function init() {
//     $(document).ready(function(){
//         $('#carousel').carousel({
//             interval: 1000
//         })
//     });
// }
