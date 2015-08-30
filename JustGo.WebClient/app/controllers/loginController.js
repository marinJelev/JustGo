import {alertError,alertSuccess} from '../utils/notifier.js';

function init() {
    $('.alert').hide();
    $('#button-reset').click(function () {
        $('#login-form').trigger('reset');
    });

    $('#button-login').click(function () {
        var currentUserInformation = {},
            username = $('#input-username').val(),
            password = $('#input-password').val();

        if (userLoginIsValid(username) && userLoginIsValid(password)) {
            currentUserInformation.username = username;
            currentUserInformation.password = password;
            alertSuccess('Success - You are logged in!','fieldset');

            console.log(currentUserInformation);

        } else {
            alertError('Username and password should be minimum 4 letters long.', 'fieldset');
        }
    });
}

function userLoginIsValid(userLoginInformation) {
    return userLoginInformation && userLoginInformation.length > 3;
}

export default {init};
