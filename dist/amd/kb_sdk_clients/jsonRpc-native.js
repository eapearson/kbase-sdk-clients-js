/*global define */
/*jslint white:true,browser:true*/
define(['./ajax'], function (ajax) {
    'use strict';

    /*
     * A reponse which is invalid.
     * A valid response is most likely a non- or improper-JSON string
     * 
     */
    function InvalidResponseError(originalError, url, data) {
        this.originalError = originalError;
        this.url = url;
        this.responseData = data;
    }
    InvalidResponseError.prototype = Object.create(Error.prototype);
    InvalidResponseError.prototype.constructor = InvalidResponseError;
    InvalidResponseError.prototype.name = 'InvalidResponseError';

    /*
     * An error returned by the http server (an http server error)
     */
    function RequestError(statusCode, statusText, url, message) {
        console.log('request error with message', message);
        this.url = url;
        this.message = message;
        this.statusCode = statusCode;
        this.statusText = statusText;
    }
    RequestError.prototype = Object.create(Error.prototype);
    RequestError.prototype.constructor = RequestError;
    RequestError.prototype.name = 'RequestError';
    
    function JsonRpcError(url, error) {
        this.url = url;
        this.message = error.message;
        this.detail = error.error;
        this.type = error.name;
        this.code = error.code;
    };
    JsonRpcError.prototype = Object.create(Error.prototype);
    JsonRpcError.prototype.constructor = JsonRpcError;
    JsonRpcError.prototype.name = 'JsonRpcError';


    function request(url, method, params, numRets, options) {
        var rpc = {
            params: params,
            method: method,
            version: '1.1',
            id: String(Math.random()).slice(2)
        },
        header = {};

        if (options.rpcContext) {
            rpc.context = options.rpcContext;
        }

        if (options.authorization !== null) {
            header.Authorization = options.authorization;
        }

        return ajax.post({
            url: url,
            timeout: options.timeout,
            data: JSON.stringify(rpc),
            header: header
        })
            .then(function (response) {
                var data = JSON.parse(response);
                if (numRets === 1) {
                    return data.result[0];
                }
                return data.result;
            })
            .catch(function (err) {
                if (err.xhr && err.xhr.responseText) {
                    try {
                        var data = JSON.parse(err.xhr.responseText);
                        // follows a weird convention. In any case, let us throw
                        // it as an exception.
                    } catch (ex) {
                        // not json, oh well.                        
                        throw new RequestError(err.xhr.status, err.xhr.statusText, url, err.xhr.responseText);
                    }
                    throw new JsonRpcError(url, data.error);
                } else {
                    throw err;
                }
            });
    }

    return Object.freeze({
        request: request,
        InvalidResponseError: InvalidResponseError,
        ServerError: RequestError
    });
});