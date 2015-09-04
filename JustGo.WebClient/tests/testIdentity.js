import chai from 'chai';
import jq from 'jquery';
import jsdom from '../node_modules/jsdom/lib/jsdom.js';
import identity from '../app/js/utils/identity.js';

var expect = chai.expect;

// localStorage Mock
function storageMock() {
    var storage = {};

    return {
        setItem: function (key, value) {
            storage[key] = value || '';
        },
        getItem: function (key) {
            return storage[key];
        },
        removeItem: function (key) {
            delete storage[key];
        },
        get length() {
            return Object.keys(storage).length;
        },
        key: function (i) {
            var keys = Object.keys(storage);
            return keys[i] || null;
        }
    };
}

describe('Identity Tests', function () {

    before(function (done) {
        jsdom.env({
            html: '',
            done: function (errors, window) {
                global.localStorage = storageMock();
                global.window = window;
                global.document = window.document;
                global.$ = jq(window);

                Object.keys(window)
                    .filter(function (prop) {
                        return prop.toLowerCase().indexOf('html') >= 0;
                    }).forEach(function (prop) {
                        global[prop] = window[prop];
                    });
                done();
            }
        });
    });

    it('Expect identity.setCurrentUser to save username in local storage', function () {
        identity.setCurrentUser('abdal');
        expect(localStorage.getItem('currentUser')).to.equal('abdal');
    });

    it('Expect identity.getCurrentUser to get username from local storage', function () {
        var user = identity.getCurrentUser();
        expect(user).to.equal('abdal');
    });

    it('Expect identity.setToken to save user token in local storage', function () {
        identity.setToken('I_AM_A_PRETTY_TOKEN');
        expect(localStorage.getItem('token')).to.equal('I_AM_A_PRETTY_TOKEN');
    });

    it('Expect identity.getToken to retrieve user token from local storage', function () {
        var token = identity.getToken();
        expect(token).to.equal('I_AM_A_PRETTY_TOKEN');
    });
});
