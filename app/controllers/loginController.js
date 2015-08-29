import $ from 'jquery';

$('#main-content').load('/app/views/loginView.html', function () {
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
            console.log(currentUserInformation);

        } else {
            showErrorMessage();
        }
    });
});

function userLoginIsValid(userLoginInformation) {
    if (!userLoginInformation || userLoginInformation.length < 4) {
        return false;
    }
    return true;
}

function showErrorMessage() {
    $('.alert').show().delay(1500).fadeOut('slow');
}