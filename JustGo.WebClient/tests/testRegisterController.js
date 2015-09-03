import chai from 'chai';
import jq from 'jquery';
import jsdom from '../node_modules/jsdom/lib/jsdom.js';
import registerController from '../app/controllers/registerController.js';

var expect = chai.expect;

// Storage Mock
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

describe('Register Controller Tests', function () {

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

    it('Registering user with INVALID USER NAME (too short) should fail', function () {

        var html = '<form class="form-horizontal" id="registration-form"><fieldset><legend>Registration</legend><div class="form-group"><label for="inputUsername" class="col-md-4 control-label">Username:</label><div class="col-md-8"><input type="text" class="form-control" id="inputUsername" placeholder="Username" value="xx"></div></div><div class="form-group"><label for="inputPassword" class="col-md-4 control-label">Password: </label><div class="col-md-8"><input type="password" class="form-control" id="inputPassword" placeholder="Password"></div></div><div class="form-group"><label for="inputPassword" class="col-md-4 control-label">Retype Password: </label><div class="col-md-8"><input type="password" class="form-control" id="retypePassword" placeholder="Retype Password"></div></div><div class="form-group"><div class="col-md-12"><div class="pull-right"><input type="button" class="btn btn-primary" id="reset-button" value="Reset"><input type="button" class="btn btn-primary btn-success" id="submit-button" value="Register"></div></div></div></fieldset></form>';
        var expectedErrorMessage = 'Username should be minimum 3 letters long!';

        var $container = $('<div/>', {
            id: 'main-content'
        });
        $('body').append($container);
        $('#main-content').append(html);
        registerController.init();

        var objectToBeClicked = document.getElementById('submit-button');
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent('click', true, true);
        objectToBeClicked.dispatchEvent(clickEvent);

        expect($('.alert').html()).to.equal(expectedErrorMessage);
    });

    it('Registering user with INVALID PASSWORD (too short) should fail', function () {
        var expectedErrorMessage = 'Password should be minimum 5 letters long!';

        $('.alert').remove();
        $('#inputUsername').attr('value', 'Hasan');
        $('#inputPassword').attr('value', '1234');
        //registerController.init();

        var objectToBeClicked = document.getElementById('submit-button');
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent('click', true, true);
        objectToBeClicked.dispatchEvent(clickEvent);

        expect($('.alert').html()).to.equal(expectedErrorMessage);
    });

    it('Registering user with NOT MATCHING PASSWORDS should fail', function () {
        var expectedErrorMessage = "Passwords don't match!";

        $('.alert').remove();
        $('#inputUsername').attr('value', 'Hasan');
        $('#inputPassword').attr('value', '12345');

        var objectToBeClicked = document.getElementById('submit-button');
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent('click', true, true);
        objectToBeClicked.dispatchEvent(clickEvent);

        expect($('.alert').html()).to.equal(expectedErrorMessage);
    });

    it('Registering user which is OK should not fail', function () {
        var expectedErrorMessage = "Passwords don't match!";

        $('.alert').remove();
        $('#retypePassword').attr('value', '12345');

        var objectToBeClicked = document.getElementById('submit-button');
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent('click', true, true);
        objectToBeClicked.dispatchEvent(clickEvent);

        expect($('.alert').html()).not.to.exist;
    });
});
