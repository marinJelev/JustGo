import httpRequester from '../utils/http-requester.js';
import identity from '../utils/identity.js';

var PLACES_URL = 'http://localhost:3030/places',
    token;

function create(place) {
    var token = identity.getToken(),

        promise = new Promise(function(resolve, reject) {
            httpRequester
                .post(PLACES_URL, place, true, token)
                .then(function(data) {
                    if (!data.success) {
                        reject(data.reason);
                    }

                    resolve(data);
                })
                .catch(function(err) {
                    reject(err);
                });
        });

    return promise;
}

function getAll() {
    var token = identity.getToken(),

        promise = new Promise(function(resolve, reject) {
            httpRequester
                .get(PLACES_URL, false, true, token)
                .then(function(data) {
                    if (!data.success) {
                        reject(data.reason);
                    }

                    resolve(data);
                })
                .catch(function(err) {
                    reject(err);
                });
        });

    return promise;
}

export default {
    create, getAll
};
