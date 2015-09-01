import httpRequester from '../utils/http-requester.js';
import identity from './identity.js';

var LOGIN_URL = 'http://localhost:3030/login';
var LOGOUT_URL = 'http://localhost:3030/logout';

function login(user) {
    var promise = new Promise(function(resolve, reject) {
        httpRequester
            .post(LOGIN_URL, user)
            .then(function(data) {
                identity.setCurrentUser(data.user.username);
                resolve(data);
            });
    });

    return promise;
}

function logout() {
    var promise = new Promise(function(resolve, reject) {
        httpRequester
            .post(LOGOUT_URL)
            .then(function(data) {
                identity.setCurrentUser('');
                resolve();
            });
    });

    return promise;
}

export default {
    login, logout
};
