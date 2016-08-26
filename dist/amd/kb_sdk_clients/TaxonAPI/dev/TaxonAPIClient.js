/*global define */
/*jslint white:true,browser:true,jsnomen:true*/
define([
    '../../jsonRpc-native'
], function (jsonRpc) {
    'use strict';

    /*
     * arg is:
     * url - service wizard url
     * timeout - request timeout
     * version - service release version or tag
     * auth - auth structure
     *   token - auth token
     *   username - username
     * auth_cb - function which returns the above value
     * async_job_check_time_ms - unused? 
     */
    function TaxonAPI(arg) {
        // Establish an auth object which has properties token and user_id.
        var auth;
        if (typeof arg.auth === 'function') {
            auth = arg.auth();
        } else {
            // REALLY??
            auth = arg.auth || {};
        }
        
        if (!arg.url) {
            throw new Error('The service discovery url was not provided');
        }
        if (!arg.version) {
            throw new Error('The service version was not provided');
        }


        function options() {
            return {
                timeout: arg.timeout,
                authorization: auth.token,
                rpcContext: arg.rpcContext
            };
        }

        this.lookupModule = function () {
            var method = 'ServiceWizard.get_service_status',
                params = [{
                        module_name: 'TaxonAPI',
                        version: arg.version || 'dev'
                    }];
            return jsonRpc.request(arg.url, method, params, 1, options());
        };

        this.get_parent = function (ref) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'TaxonAPI.get_parent',
                        params = [ref];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_children = function (ref) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'TaxonAPI.get_children',
                        params = [ref];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_genome_annotations = function (ref) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'TaxonAPI.get_genome_annotations',
                        params = [ref];
                    jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_scientific_lineage = function (ref) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'TaxonAPI.get_scientific_lineage',
                        params = [ref];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_scientific_name = function (ref) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'TaxonAPI.get_scientific_name',
                        params = [ref];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_taxonomic_id = function (ref) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'TaxonAPI.get_taxonomic_id',
                        params = [ref];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_kingdom = function (ref) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'TaxonAPI.get_kingdom',
                        params = [ref];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_domain = function (ref) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'TaxonAPI.get_domain',
                        params = [ref];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_genetic_code = function (ref) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'TaxonAPI.get_genetic_code',
                        params = [ref];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_aliases = function (ref) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'TaxonAPI.get_aliases',
                        params = [ref];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_info = function (ref) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'TaxonAPI.get_info',
                        params = [ref];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_history = function (ref) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'TaxonAPI.get_history',
                        params = [ref];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_provenance = function (ref) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'TaxonAPI.get_provenance',
                        params = [ref];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_id = function (ref) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'TaxonAPI.get_id',
                        params = [ref];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_name = function (ref) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'TaxonAPI.get_name',
                        params = [ref];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };
        
        this.get_all_data = function (p) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'TaxonAPI.get_all_data',
                        params = [p];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_decorated_scientific_lineage = function (p) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'TaxonAPI.get_decorated_scientific_lineage',
                        params = [p];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_version = function (ref) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'TaxonAPI.get_version',
                        params = [ref];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.status = function () {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'TaxonAPI.status',
                        params = [];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };
    }
    return TaxonAPI;
});
