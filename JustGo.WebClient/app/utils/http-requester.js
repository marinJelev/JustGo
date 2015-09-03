function get(url, data, json, token) {
    var headers = customHeaders(json, token);

    return request('GET', url, data, headers);
}

function post(url, data, json, token) {
    var headers = customHeaders(json, token);

    return request('POST', url, data, headers);
}

function request(type, url, data, headers) {
    var promise = new Promise(function(resolve, reject) {
        $.ajax({
            url: url,
            method: type,
            headers: headers,
            data: JSON.stringify(data),
            success: function(data) {
                resolve(data);
            },
            error: function(err) {
                reject(err);
            }
        });
    });

    return promise;
}

function customHeaders(json, token){
    var headers = {};
    if(json){
      headers['contentType'] = 'application/json'
    }

    if(token){
        headers['X-Access-Token'] = token;
    }

    return headers
}


export default { get, post };
