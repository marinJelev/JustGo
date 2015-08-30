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
            console.log(currentUserInformation);

        } else {
            toggleErrorMessage();
            setTimeout(toggleErrorMessage, 2000);
        }
    });

}

function userLoginIsValid(userLoginInformation) {
    return userLoginInformation && userLoginInformation.length > 4;
}

function toggleErrorMessage() {
    $('.alert').toggle('slow');
}

export default {init};
