import {alertError,alertSuccess} from '../utils/notifier.js';

function init() {
    $('.alert').hide();
    $('#reset-button').on('click', function () {
        $('.form-horizontal').trigger('reset');
    });
    $('#submit-button').on('click', function () {
        var currentUserInformation = {},
            username = $('#inputUsername').val(),
            email = $('#inputEmail').val(),
            password = $('#inputPassword').val();

        if (userLoginIsValid(username) && userLoginIsValid(password) && userLoginIsValid(email)) {
            currentUserInformation.username = username;
            currentUserInformation.email = email;
            currentUserInformation.password = password;
            alertSuccess('Successful registration.','fieldset');
            console.log(currentUserInformation);

        }
        if (!userLoginIsValid(username)) {
            alertError('Invalid username! Username must be 4 characters or more.', 'fieldset');
        }
        if (!userLoginIsValid(email)) {
            alertError('Invalid Email!', 'fieldset');
        }
        if (!userLoginIsValid(password)) {
            alertError('Invalid Password! Password must be 4 characters or more.', 'fieldset');
        }
    });
}

function userLoginIsValid(userLoginInformation) {
    return userLoginInformation && userLoginInformation.length > 3;
}

export default {init};
