import Handlebars from '../../bower_components/handlebars/handlebars.js';
import httpRequester from 'utils/http-requester.js'

var instance = null;

class TemplateGenerator {
    constructor() {
        if (!instance) {
            instance = this;
        }
        this.lazy = {};

        return instance;
    }

    get(url) {
        if (!this.lazy[url]) {
            this.lazy[url] = this.compile(url);
        }

        return this.lazy[url]
    }

    compile(url) {
        var promise = new Promise(function (resolve, reject) {
            $.get(url)
                .then(function (data) {
                    var template = Handlebars.compile(data);
                    return template
                })
                .then(function (data) {
                    resolve(data);
                });
        });

        return promise;
    }
}

function get(url) {
    if (!instance) {
        instance = new TemplateGenerator();
    }

    return instance.get(url);
}

export default {get}


