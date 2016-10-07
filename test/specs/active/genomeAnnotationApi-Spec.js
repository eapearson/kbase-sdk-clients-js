define([
    'dist/amd/kb_sdk_clients/GenomeAnnotationAPI/dev/GenomeAnnotationAPIClient',
    'test/config/kbaseConfig',
    'test/lib/utils'
], function (API, config, utils) {
    'use strict';
    describe('Sanity check', function () {
        it('The module should load', function () {
            expect(API).not.toBe(null);
        });
    });

    var status = {
        git_commit_hash: '5a24068953cd321f702d5705e44adf2992833d4a',
        state: 'OK',
        version: '0.1.0',
        message: '',
        git_url: 'https://github.com/kbaseapps/SetAPI'
    };
    describe('SetAPI status should be normal', function () {
        it('Is the status normal?', function (done) {
            var client = new API({
                url: config.serviceWizardUrl,
                version: 'dev'
            });
            client.status()
                .then(function (result) {
                    expect(result.state).toBe('OK');
                    done();
                });
        });
    });

    
});
