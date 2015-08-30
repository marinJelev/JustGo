function init() {
    $('.alert').hide();
    $('#reset-button').on('click', function () {
        $('.form-horizontal').trigger('reset');
    });
    $('#submit-button').on('click', function () {
        var currentUserInformation = {},
            username = $('#inputUsername').val(),
            email = $('#inputEmail').val(),
            password = $('#inputPassword').val(),
            retypePassword = $('#retypePassword').val();

        if (!userLoginIsValid(username)) {
            showUsernameErrorMessage();
        }
        else if (!userLoginIsValid(email)) {
            showEmailErrorMessage();
        }
        else if (!userLoginIsValid(password)) {
            showPasswordErrorMessage();
        }
        else if (userLoginIsValid(username) && userLoginIsValid(password) && userLoginIsValid(email)) {
            currentUserInformation.username = username;
            currentUserInformation.email = email;
            currentUserInformation.password = password;
            console.log(currentUserInformation);
        }

        if (validPasswordAndRetypePassword(password, retypePassword)) {
             passwordsDontMatchMessage();
        }
    });

    $.ajax ({
        type: 'GET',
        url: 'localhost:3030/register',
        data: JSON.stringify(currentUserInformation),
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            // call login from loginCtrl
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function userLoginIsValid(userLoginInformation) {
    return userLoginInformation && userLoginInformation.length > 3;
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

function passwordsDontMatchMessage() {
    $('#invalid-passwords').show().delay(1500).fadeOut('slow');
}

function validPasswordAndRetypePassword(password, newPassword){
    return  password !== newPassword;
}

export default {init};
