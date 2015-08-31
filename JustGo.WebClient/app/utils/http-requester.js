function get(url, data) {
    return request('GET', url, data);
}

function post(url, data) {
    return request('POST', url, data);
}

function request(type, url, data) {
    var promise = new Promise(function(resolve, reject) {
        $.ajax({
            url: url,
            method: type,
            contentType: 'application/json',
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

export default { get, post };
