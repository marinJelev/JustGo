import identity from '../services/identity.js';
import notifier from '../utils/notifier.js';
import auth from '../services/auth.js';
import template from '../utils/templateGenerator.js';
import crypto from '../../node_modules/crypto-js/crypto-js.js';

var USERNAME_MIN_VALID_LENGTH = 3,
    PASSWORD_MIN_VALID_LENGTH = 5,
    LOGIN_SUCCESS_MESSAGE = 'Success - You are logged in!',
    INVALID_USERNAME_MESSAGE = 'Username should be minimum ' + USERNAME_MIN_VALID_LENGTH + ' letters long',
    INVALID_PASSWORD_MESSAGE = 'Password should be minimum ' + PASSWORD_MIN_VALID_LENGTH + ' letters long',
    TEMPLATE_URL = 'app/views/loginView.html';

function init() {
    if (identity.getCurrentUser()) {
        routie('/home');
        return;
    }

    template
        .get(TEMPLATE_URL)
        .then(function(template) {
            $('#main-content').html(template());
        })
        .then(function() {
            bindEvents();
        });
}

function bindEvents() {
    var $loginForm = $('#login-form'),
        $buttonLogin = $('#button-login'),
        $buttonReset = $('#button-reset');

    $buttonReset.on('click', function() {
        $loginForm.trigger('reset');
    });

    $buttonLogin.on('click', handleUserLogin);
}

function handleUserLogin() {
    var $inputUsername = $('#input-username'),
        $inputPassword = $('#input-password'),
        currentUser = {},
        username = $inputUsername.val(),
        password = $inputPassword.val(),
        encryptedPassword = crypto.SHA256(password).toString();

    if (!isValidUsername(username)) {
        notifier.alertError(INVALID_USERNAME_MESSAGE);
        return;
    }

    if (!isValidPassword(password)) {
        notifier.alertError(INVALID_PASSWORD_MESSAGE);
        return;
    }

    currentUser.username = username;
    currentUser.password = encryptedPassword;

    auth
        .login(currentUser)
        .then(function() {
            notifier.alertSuccess(LOGIN_SUCCESS_MESSAGE);
            routie('/home');
        })
        .catch(function(err) {
            notifier.alertError(err);
        });
}

function isValidUsername(username) {
    return username.length >= USERNAME_MIN_VALID_LENGTH;
}

function isValidPassword(password) {
    return password.length >= PASSWORD_MIN_VALID_LENGTH;
}

export default { init };
