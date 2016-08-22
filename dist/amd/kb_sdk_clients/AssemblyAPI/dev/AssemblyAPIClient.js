/*global define */
/*jslint white:true,browser:true,jsnomen:true*/
define([
    '../../jsonRpc-native'
], function (jsonRpc) {
    'use strict';

    function AssemblyAPI(arg) {
        // Establish an auth object which has properties token and user_id.
        var auth;
        if (typeof arg.auth === 'function') {
            auth = arg.auth();
        } else {
            auth = arg.auth || {};
        }
        
        if (!arg.url) {
            console.error('ERROR', arg);
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
                        module_name: 'AssemblyAPI',
                        version: arg.version || 'dev'
                    }];
            return jsonRpc.request(arg.url, method, params, 1, options());
        };


        this.get_assembly_id = function (ref) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'AssemblyAPI.get_assembly_id',
                        params = [ref];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_genome_annotations = function (ref) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'AssemblyAPI.get_genome_annotations',
                        params = [ref];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_external_source_info = function (ref) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'AssemblyAPI.get_external_source_info',
                        params = [ref];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_stats = function (ref) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'AssemblyAPI.get_stats',
                        params = [ref];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_number_contigs = function (ref) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'AssemblyAPI.get_number_contigs',
                        params = [ref];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_gc_content = function (ref) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'AssemblyAPI.get_gc_content',
                        params = [ref];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_dna_size = function (ref) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'AssemblyAPI.get_dna_size',
                        params = [ref];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_contig_ids = function (ref) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'AssemblyAPI.get_contig_ids',
                        params = [ref];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_contig_lengths = function (ref, contig_id_list) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'AssemblyAPI.get_contig_lengths',
                        params = [ref, contig_id_list];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });            
        };

        this.get_contig_gc_content = function (ref, contig_id_list) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'AssemblyAPI.get_contig_gc_content',
                        params = [ref, contig_id_list];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                }); 
        };

        this.get_contigs = function (ref, contig_id_list) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'AssemblyAPI.get_contigs',
                        params = [ref, contig_id_list];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                }); 

        };

        this.status = function () {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'AssemblyAPI.get_contigs',
                        params = [];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };
    }

    return AssemblyAPI;
});
