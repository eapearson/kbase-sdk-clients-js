/*global define */
/*jslint white:true,browser:true,jsnomen:true*/
define([
    './jsonRpc-native'
], function(jsonRpc) {
    'use strict';

    /*
     * arg is:
     * url - service wizard url
     * timeout - request timeout
     * version - service release version or tag
     * auth - auth structure
     *   token - auth token
     *   username - username
     * rpcContext
     */
    function GenericClient(arg) {
        // Establish an auth object which has properties token and user_id.
        var module = arg.module;
        var token = arg.token || (arg.auth ? arg.auth.token : null);

        if (!arg.url) {
            throw new Error('The service discovery url was not provided');
        }

        // The version defaults to null, which signals the service wizard to use the
        // defaulting protocol, which is using the most "released" version first, 
        // so release if available, if not beta if available, if not dev, otherwise error.
        // Note that in a specific environment, the defaulting behavior may be different.
        // Also, 'auto' implies the same defaulting behavior, but is more explicit.
        var version;
        if (!arg.version) {
            version = null;
        } else if (arg.version === 'auto') {
            version = null;
        } else {
            version = arg.version;
        }

        function options() {
            return {
                timeout: arg.timeout,
                authorization: token,
                rpcContext: arg.rpcContext
            };
        }

        this.lookupModule = function() {
            var func = 'get_service_status',
                params = [{
                    module_name: module,
                    version: version
                }];
            // NB: pass null for numRets (number of return values) so we get the 
            // full return structure.
            return jsonRpc.request(arg.url, 'ServiceWizard', func, params, null, options());
        };

        this.callFunc = function(funcName, params) {
            // var params = Array.prototype.slice.call(arguments);
            return this.lookupModule()
                .spread(function(serviceStatus) {
                    return jsonRpc.request(serviceStatus.url, module, funcName, params, null, options());
                });
        };

    }
    return GenericClient;
});