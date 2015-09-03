import httpRequester from '../utils/http-requester.js';
import identity from './identity.js';

var LOGIN_URL = 'http://localhost:3030/login';
var LOGOUT_URL = 'http://localhost:3030/logout';

function login(user) {
    var promise = new Promise(function(resolve, reject) {
        httpRequester
            .post(LOGIN_URL, user, true)
            .then(function(data) {
                if (!data.success) {
                    reject(data.reason);
                }

                identity.setCurrentUser(data.user.username);
                identity.setToken(data.user.accessToken);
                resolve(data);
            })
            .catch(function(err) {
                console.log(err);

                if (!err.reason) {
                    reject(err);
                }

                reject(err.reason);
            });
    });

    return promise;
}

function logout() {
    var token =  identity.getToken();
    var promise = new Promise(function(resolve, reject) {
        httpRequester
            .post(LOGOUT_URL, true, token)
            .then(function(data) {
                identity.setCurrentUser('');
                identity.setToken('');
                resolve();
            })
            .catch(function(err) {
                reject(err);
            });
    });

    return promise;
}

export default {
    login, logout
};
