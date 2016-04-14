var _ = require("lodash");

function ReqError(message, response) {
    this.name = "ReqError";
    this.message = message || "Default Message";
    this.response = response || {};
}
ReqError.prototype = new Error();
ReqError.prototype.constructor = ReqError;

var xhrPool = [];

function addRequestToPool(request) {
    xhrPool.push(request);
}

function removeRequestFromPool(request) {
    _.remove(xhrPool, function (i) {
        return i == request
    });
}

function abortInFlightRequests() {
    return _.map(xhrPool, function (r) {
        r.abort();
    })
}

var pageInvalid = false;

window.onbeforeunload = function () {
    pageInvalid = true;
    abortInFlightRequests();
};

function get(url) {
    return new Promise(function (resolve, reject) {
        // Do the usual XHR stuff

        if (pageInvalid) {
            reject(new ReqError("Promise evaluated too late"));
            return;
        }

        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function () {
            removeRequestFromPool(req);
            // This is called even on 404 etc
            // so check the status
            if (req.status == 200) {
                // Resolve the promise with the response text
                resolve(req.response);
            }
            else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(new ReqError(req.statusText, req.response));
            }
        };

        // Handle network errors
        req.onerror = function () {
            removeRequestFromPool(req);
            reject(new ReqError(req.statusText, req.response));
        };

        addRequestToPool(req);

        // Make the request
        req.send();
    });
}

function doit(method, url, object) {
    return new Promise(function (resolve, reject) {

        if (pageInvalid) {
            reject(new ReqError("Promise evaluated too late"));
            return;
        }

        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open(method, url);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        req.onload = function () {
            removeRequestFromPool(req);

            if (req.status == 200) {
                resolve(req.response);
            }
            else {
                reject(req.response)
            }
        };

        // Handle network errors
        req.onerror = function () {
            removeRequestFromPool(req);
            reject(Error("Network Error"));
        };

        addRequestToPool(req);
        // Make the request
        req.send(JSON.stringify(object));
    });

}

function post(url, object) {
    return doit("POST", url, object);
}

function put(url, object) {
    return doit("PUT", url, object);
}

function postForm(url, formdata, progress, contentType) {
    return sendForm('POST', url, formdata, progress, contentType);
}

function putForm(url, formdata, progress, contentType) {
    return sendForm('PUT', url, formdata, progress, contentType);
}

function sendForm(method, url, formdata, progress, contentType) {
    return new Promise(function (resolve, reject) {
        if ( pageInvalid ) {
            reject(new ReqError("Promise evaluated too late"));
            return;
        }

        var req = new XMLHttpRequest();
        req.open(method, url);
        if (contentType) {
            req.setRequestHeader("Content-type", contentType);
        }

        req.onload = function () {
            removeRequestFromPool(req);
            // This is called even on 404 etc
            // so check the status
            if (req.status == 200) {
                // Resolve the promise with the response text
                resolve(req.response);
            }
            else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(req.response)//JSON.parse(req.response).content[0].message);
            }
        };

        req.onerror = function () {
            removeRequestFromPool(req);
            reject(Error("Network Error"));
        };

        req.upload.addEventListener("progress", progress, false);

        addRequestToPool(req);

        req.send(formdata);
    })
}
module.exports.get = get;
module.exports.post = post;
module.exports.put = put;
module.exports.postForm = postForm;
module.exports.putForm = putForm;



