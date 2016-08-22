/*global define */
/*jslint white:true,browser:true,jsnomen:true*/
define([
    '../../jsonRpc-native'
], function (jsonRpc) {
    'use strict';

    function GenomeAnnotationAPI(arg) {
        // Establish an auth object which has properties token and user_id.
        var auth;
        if (typeof arg.auth === 'function') {
            auth = arg.auth();
        } else {
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
                        module_name: 'GenomeAnnotationAPI',
                        version: arg.version
                    }];
            return jsonRpc.request(arg.url, method, params, 1, options());
        };

        this.get_taxon = function (inputs_get_taxon) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.get_taxon',
                        params = [inputs_get_taxon];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_assembly = function (inputs_get_assembly) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.get_assembly',
                        params = [inputs_get_assembly];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_feature_types = function (inputs_get_feature_types) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.get_feature_types',
                        params = [inputs_get_feature_types];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_feature_type_descriptions = function (inputs_get_feature_type_descriptions) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.get_feature_type_descriptions',
                        params = [inputs_get_feature_type_descriptions];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_feature_type_counts = function (inputs_get_feature_type_counts) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.get_feature_type_counts',
                        params = [inputs_get_feature_type_counts];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_feature_ids = function (inputs_get_feature_ids) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.get_feature_ids',
                        params = [inputs_get_feature_ids];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_features = function (inputs_get_features) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.get_features',
                        params = [inputs_get_features];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });            
        };

        this.get_features2 = function (params) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.get_features2',
                        params = [params];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_proteins = function (inputs_get_proteins) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.get_proteins',
                        params = [inputs_get_proteins];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_feature_locations = function (inputs_get_feature_locations) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.get_feature_locations',
                        params = [inputs_get_feature_locations];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_feature_publications = function (inputs_get_feature_publications) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.get_feature_publications',
                        params = [inputs_get_feature_publications];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_feature_dna = function (inputs_get_feature_dna) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.get_feature_dna',
                        params = [inputs_get_feature_dna];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_feature_functions = function (inputs_get_feature_functions) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.get_feature_functions',
                        params = [inputs_get_feature_functions];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_feature_aliases = function (inputs_get_feature_aliases) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.get_feature_aliases',
                        params = [inputs_get_feature_aliases];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_cds_by_gene = function (inputs_get_cds_by_gene) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.get_cds_by_gene',
                        params = [inputs_get_cds_by_gene];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_cds_by_mrna = function (inputs_mrna_id_list) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.get_cds_by_mrna',
                        params = [inputs_mrna_id_list];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_gene_by_cds = function (inputs_get_gene_by_cds) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.get_gene_by_cds',
                        params = [inputs_get_gene_by_cds];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_gene_by_mrna = function (inputs_get_gene_by_mrna) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.get_gene_by_mrna',
                        params = [inputs_get_gene_by_mrna];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_mrna_by_cds = function (inputs_get_mrna_by_cds) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.get_mrna_by_cds',
                        params = [inputs_get_mrna_by_cds];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_mrna_by_gene = function (inputs_get_mrna_by_gene) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.get_mrna_by_gene',
                        params = [inputs_get_mrna_by_gene];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_mrna_exons = function (inputs_get_mrna_exons) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.get_mrna_exons',
                        params = [inputs_get_mrna_exons];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_mrna_utrs = function (inputs_get_mrna_utrs) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.get_mrna_utrs',
                        params = [inputs_get_mrna_utrs];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.get_summary = function (inputs_get_summary) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.get_summary',
                        params = [inputs_get_summary];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.save_summary = function (inputs_save_summary) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.save_summary',
                        params = [inputs_save_summary];
                    return jsonRpc.request(serviceStatus.url, method, params, 2, options());
                });
        };

        this.get_combined_data = function (params) {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.get_combined_data',
                        params = [params];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };

        this.status = function () {
            return this.lookupModule()
                .then(function (serviceStatus) {
                    var method = 'GenomeAnnotationAPI.status',
                        params = [];
                    return jsonRpc.request(serviceStatus.url, method, params, 1, options());
                });
        };
    }

    return GenomeAnnotationAPI;
});