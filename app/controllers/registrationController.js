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
            console.log(currentUserInformation);

        }
        else if (!userLoginIsValid(username)) {
            showUsernameErrorMessage();
        }
        else if (!userLoginIsValid(email)) {
            showEmailErrorMessage();
        }
        else if (!userLoginIsValid(password)) {
            showPasswordErrorMessage();
        }
    });
}

function userLoginIsValid(userLoginInformation) {
    if (!userLoginInformation || userLoginInformation.length < 4) {
        return false;
    }
    return true;
}

function showUsernameErrorMessage() {
    $('#username-error').show().delay(1500).fadeOut('slow');
}

function showEmailErrorMessage() {
    $('#email-error').show().delay(1500).fadeOut('slow');
}

function showPasswordErrorMessage() {
    $('#password-error').show().delay(1500).fadeOut('slow');
}

export default {init};
