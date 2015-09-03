function get(url, data, json, token) {
    return request('GET',  url, data,json, token);
}

function post(url, data, json, token) {
    return request('POST', url, data,json, token);
}

function request(type, url, data, json, token) {
    var promise = new Promise(function(resolve, reject) {
        $.ajax({
            url: url,
            method: type,
            beforeSend: function (xhr) {
                customHeaders(xhr, json, token)
            },
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

function customHeaders(xhr, json, token){
    var headers = {};
    if(json){
        xhr.setRequestHeader('Content-Type', 'application/json');
    }

    if(token){
        xhr.setRequestHeader('X-Access-Token', token);
    }

    return headers
}


export default { get, post };
