import identity from '../services/identity.js';
import notifier from '../utils/notifier.js';
import users from '../data/users.js';

var USERNAME_MIN_VALID_LENGTH = 3,
    PASSWORD_MIN_VALID_LENGTH = 5,
    EMAIL_MIN_VALID_LENGTH = 7,
    REGISTRATION_SUCCESS_MESSAGE = 'Registration successful!',
    INVALID_USERNAME_MESSAGE = 'Username should be minimum ' + USERNAME_MIN_VALID_LENGTH + ' letters long!',
    INVALID_PASSWORD_MESSAGE = 'Password should be minimum ' + PASSWORD_MIN_VALID_LENGTH + ' letters long!',
    INVALID_EMAIL_MESSAGE = 'Email should be minimum ' + EMAIL_MIN_VALID_LENGTH + ' characters long!',
    PASSWORDS_DONT_MATCH_MESSAGE = "Passwords don't match!";

function init() {
    if (identity.getCurrentUser()) {
        routie('/home');
        return;
    }

    $('#main-content').load('app/views/registerView.html', bindEvents);
}

function bindEvents(argument) {
    var $registrationForm = $('#registration-form'),
        $resetButton = $('#reset-button'),
        $submitButton = $('#submit-button');

    $resetButton.on('click', function() {
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
        retypedPassword = $('#retypePassword').val(),
        encryptedPassword = CryptoJS.SHA256(password);

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
    currentUser.password = encryptedPassword;

    users
        .create(currentUser)
        .then(function(user) {
            notifier.alertSuccess(REGISTRATION_SUCCESS_MESSAGE);
            routie('/login');
        })
        .catch(function(err) {
            notifier.alertError(err);
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
    return password === retypedPassword;
}

export default {
    init
};
