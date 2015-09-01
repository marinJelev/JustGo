import notifier from '../utils/notifier.js';
import auth from '../services/auth.js';

var USERNAME_MIN_VALID_LENGTH = 3,
    PASSWORD_MIN_VALID_LENGTH = 5,
    EMAIL_MIN_VALID_LENGTH = 7,
    LOGIN_SUCCESS_MESSAGE = 'Success - You are logged in!',
    INVALID_USERNAME_MESSAGE = 'Username should be minimum ' + USERNAME_MIN_VALID_LENGTH + ' letters long!',
    INVALID_PASSWORD_MESSAGE = 'Password should be minimum ' + PASSWORD_MIN_VALID_LENGTH + ' letters long!',
    INVALID_EMAIL_MESSAGE = 'Email should be minimum ' + EMAIL_MIN_VALID_LENGTH + ' characters long!',
    PASSWORDS_DONT_MATCH_MESSAGE = "Passwords don't match!";

function init() {
    var $registrationForm = $('#registration-form'),
        $resetButton = $('#reset-button'),
        $submitButton = $('#submit-button');

    $resetButton.on('click', function () {
        $registrationForm.trigger('reset');
    });

    $submitButton.on('click', handleRegistrationLogic);
}

function handleRegistrationLogic() {
    var currentUser = {},
        username = $('#inputUsername').val(),
        firstName = $('#firstName').val(),
        lastName = $('#lastName').val(),
        email = $('#inputEmail').val(),
        password = $('#inputPassword').val(),
        retypedPassword = $('#retypePassword').val();


    if (!isValidUsername(username)) {
        notifier.alertError(INVALID_USERNAME_MESSAGE);
    }
    if (!isValidEmail(email)) {
        notifier.alertError(INVALID_EMAIL_MESSAGE);
    }
    if (!isValidPassword(password)) {
        notifier.alertError(INVALID_PASSWORD_MESSAGE);
    }

    if (!arePasswordsEqual(password, retypedPassword)) {
        notifier.alertError(PASSWORDS_DONT_MATCH_MESSAGE);
    }

    currentUser.username = username;
    currentUser.firstName = firstName;
    currentUser.lastName = lastName;
    currentUser.email = email;
    currentUser.password = password;

    auth
        .login(currentUser)
        .then(function (data) {
            notifier.alertSuccess(LOGIN_SUCCESS_MESSAGE);
            $('#menu-unauthorised').toggle();
            $('#menu-authorised').toggle();
            routie('/dashboard');
        });
}

function isValidUsername(username) {
    return username.length >= USERNAME_MIN_VALID_LENGTH;
}

function isValidEmail(email) {
    return email.length >= EMAIL_MIN_VALID_LENGTH;
}

function isValidPassword(password) {
    return password.length >= PASSWORD_MIN_VALID_LENGTH;
}
function arePasswordsEqual(password, retypedPassword) {
    return password !== retypedPassword;
}

export default {init};
