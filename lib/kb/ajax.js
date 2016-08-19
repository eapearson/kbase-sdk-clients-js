/*global define */
/*jslint white: true */
define([
    'xmlhttprequest'
], function (xmlHttpRequest) {
    'use strict';
    var XMLHttpRequest = xmlHttpRequest.XMLHttpRequest;
    function ClientException(code, message, xhr) {
        this.code = code;
        this.xhr = xhr;
        this.message = message;
    }
    ClientException.prototype = Object.create(Error);
    ClientException.prototype.constructor = ClientException;
    
    function ServerException(code, message, xhr) {
        this.code = code;
        this.xhr = xhr;
        this.message = message;
    }
    ServerException.prototype = Object.create(Error);
    ServerException.prototype.constructor = ServerException;
    
    function TimeoutException(timeout, elapsed, message, xhr) {
        this.timeout = timeout;
        this.elapsed = elapsed;
        this.xhr = xhr;
        this.message = message;
    }
    TimeoutException.prototype = Object.create(Error);
    TimeoutException.prototype.constructor = TimeoutException;
    
     
    function GeneralException(message, xhr) {
        this.xhr = xhr;
        this.message = message;
    }
    GeneralException.prototype = Object.create(Error);
    GeneralException.prototype.constructor = GeneralException;
    
    function AbortException(message, xhr) {
        this.xhr = xhr;
        this.message = message;
    }
    AbortException.prototype = Object.create(Error);
    AbortException.prototype.constructor = AbortException;
    
    function post(options) {
        var timeout = options.timeout || 60000,
            startTime = new Date();
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status >= 400 && xhr.status < 500) {
                    reject(new ClientException(xhr.status, 'Client Error', xhr));
                }
                if (xhr.status >= 500) {
                    reject(new ServerException(xhr.status, 'Server Error', xhr));
                }
                
                // var buf = new Uint8Array(xhr.response);
                try {
                    resolve(xhr.response);
                } catch (ex) {
                    reject(ex);
                }
            };
            
            xhr.ontimeout = function () {
                var elapsed = (new Date()) - startTime;
                reject(new TimeoutException(timeout, elapsed, 'Request timeout', xhr));
            };
            xhr.onerror = function () {
                reject(new GeneralException('General request error', xhr));
            };
            xhr.onabort = function () {
                // reject(new AbortException('Request was aborted', xhr));
            };


            xhr.timeout = options.timeout || 60000;
            try {
                xhr.open('POST', options.url, true);
            } catch (ex) {
                reject(new GeneralException('Error opening request', xhr));
            }

            try {
                // Send header if provided
                console.log('sending header', options.header);
                if (options.header) {
                    Object.keys(options.header).forEach(function (key) {
                        xhr.setRequestHeader(key, options.header[key]);
                    });
                }                
                if (options.responseType) {
                    xhr.responseType = options.responseType;
                }
                xhr.withCredentials = options.withCredentials || false;
                console.log('sending...');
                
                // We support two types of data to send ... strings or int (byte) buffers
                if (typeof options.data === 'string') {
                    console.log('sending string', options.data);
                    xhr.send(options.data);
                } else if (options.data instanceof Array) {
                    xhr.send(new Uint8Array(options.data));
                } else {
                    reject(new Error('Invalid type of data to send'));
                }
            } catch (ex) {
                reject(new GeneralException('Error sending data in request', xhr));
            }
        });
    }
    
    function get(options) {
        var timeout = options.timeout || 60000,
            startTime = new Date();
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function (e) {
                if (xhr.status >= 400 && xhr.status < 500) {
                    reject(new ClientException(xhr.status, 'Client Error', xhr));
                }
                if (xhr.status >= 500) {
                    reject(new ServerException(xhr.status, 'Server Error', xhr));
                }
                
                // var buf = new Uint8Array(xhr.response);
                try {
                    resolve(xhr.response);
                } catch (ex) {
                    reject(ex);
                }
            };
            
            xhr.ontimeout = function () {
                var elapsed = (new Date()) - startTime;
                reject(new TimeoutException(timeout, elapsed, 'Request timeout', xhr));
            };
            xhr.onerror = function () {
                reject(new GeneralException('General request error', xhr));
            };
            xhr.onabort = function () {
                // reject(new AbortException('Request was aborted', xhr));
            };

            xhr.timeout = options.timeout || 60000;
            try {
                xhr.open('GET', options.url, true);
            } catch (ex) {
                reject(new GeneralException('Error opening request', xhr));
            }

            try {
                
                if (options.header) {
                    Object.keys(options.header).forEach(function (key) {
                        xhr.setRequestHeader(key, options.header[key]);
                    });
                }
                if (options.responseType) {
                    xhr.responseType = options.responseType;
                }
                xhr.withCredentials = options.withCredentials || false;
                
                // We support two types of data to send ... strings or int (byte) buffers
                xhr.send();
            } catch (ex) {
                reject(new GeneralException('Error sending data in request', xhr));
            }
        });
    }

    return {
        get: get,
        post: post,
        GeneralException: GeneralException,
        AbortException: AbortException,
        TimeoutException: TimeoutException,
        ServerException: ServerException,
        ClientException: ClientException
    };
});