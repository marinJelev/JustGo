import httpRequester from '../utils/http-requester.js';
import identity from '../utils/identity.js';

var TRIPS_URL = 'http://localhost:3030/trips',
    token;

function create(trip) {
    var token = identity.getToken(),

        promise = new Promise(function(resolve, reject) {
            httpRequester
                .post(TRIPS_URL, trip, true, token)
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
                .get(TRIPS_URL, false, true, token)
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
