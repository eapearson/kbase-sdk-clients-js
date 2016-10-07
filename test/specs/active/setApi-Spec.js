define([
    'dist/amd/kb_sdk_clients/SetAPI/dev/SetAPIClient',
    'kb_common/session',
    'test/config/kbaseConfig',
    'test/lib/utils'
], function (SetAPI, Session, config, utils) {
    'use strict';
    describe('Sanity check', function () {
        it('The module should load', function () {
            expect(SetAPI).not.toBe(null);
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
            var client = new SetAPI({
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

    // Create various types of sets:
    // note we need a donor workspace (not currently created here.)
    // TODO:
    // generate names
    describe('Create a set', function () {
        it('Should be able to create a set with just a name', function (done) {
            var objectName = 'some_set_name';
            utils.getToken()
                .then(function (token) {
                    var client = new SetAPI({
                        url: config.serviceWizardUrl,
                        version: 'dev',
                        auth: {
                            token: token
                        }
                    });
                    return client.save_reads_set_v1({
                        workspace: config.workspaceId,
                        output_object_name: objectName,
                        data: {
                            description: '',
                            items: []
                        }
                    });
                })
                .then(function (result) {
                    // TODO: more testing
                    // e.g. test the structure returned, and valid values in it.
                    // well, should always do that.
                    expect(result.set_info[1]).toBe(objectName);
                    done();
                })
                .catch(function (err) {
                    console.log('ERROR!!!', err);
                    done.fail('Error');
                });

        });
    });
});
