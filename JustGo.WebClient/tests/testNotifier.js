import chai from 'chai';
import jq from 'jquery';
import notifier from '../app/js/utils/notifier.js';
import jsdom from '../node_modules/jsdom/lib/jsdom.js';

var expect = chai.expect;

describe('Notifier Tests', function () {

    before(function (done) {
        jsdom.env({
            html: '',
            done: function (errors, window) {
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

    it('Alerting ERROR through notifier should append a valid div to the html body', function () {
        var html = '<div class="alert alert-dismissible alert-pesho alert-danger" style="opacity: 1;">ERROR</div>';
        notifier.alertError("ERROR");
        expect(document.body.innerHTML).to.equal(html);
    });

    it('Alerting SUCCESS through notifier should append a valid div to the html body', function () {
        document.body.innerHTML = '';
        var html = '<div class="alert alert-dismissible alert-pesho alert-success" style="opacity: 1;">SUCCESS</div>';
        notifier.alertSuccess("SUCCESS");
        expect(document.body.innerHTML).to.equal(html);
    });
});
