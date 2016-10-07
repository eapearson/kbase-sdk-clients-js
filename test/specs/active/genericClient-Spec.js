define([
    'dist/amd/kb_sdk_clients/genericClient',
    'kb_common/session',
    'test/config/kbaseConfig',
    'test/lib/utils'
], function (GenericClient, Session, config,utils) {
    'use strict';
    describe('Sanity check', function () {
        it('The module should load', function () {
            expect(GenericClient).not.toBe(null);
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
            var client = new GenericClient({
                url: config.serviceWizardUrl,
                module: 'SetAPI',
                version: 'dev'
            });
            client.callFunc('status', [])
                .then(function (result) {
                    expect(result[0].state).toBe('OK');
                    done();
                    return null;
                })
                .catch(function (err) {
                    console.error('ERROR', err);
                    done.fail('error getting status');
                });
        });
    });

    // Create various types of sets:
    // note we need a donor workspace (not currently created here.)
    // TODO:
    // generate names
    var workspaceId = config.workspaceId;
    describe('Create a set', function () {
        it('Should be able to create a set with just a name', function (done) {
            var objectName = 'some_set_name';
            utils.getToken()
                .then(function (token) {
                     var client = new GenericClient({
                        url: config.serviceWizardUrl,
                        module: 'SetAPI',
                        version: 'dev',
                        auth: {token: token}
                    });
                    return client.callFunc('save_reads_set_v1', [{
                        workspace: workspaceId,
                        output_object_name: objectName,
                        data: {
                            description: '',
                            items: []
                        }
                    }]);
                })
                .then(function (result) {
                    // TODO: more testing
                    // e.g. test the structure returned, and valid values in it.
                    // well, should always do that.
                    expect(result[0].set_info[1]).toBe(objectName);
                    done();
                    return null;
                })
                .catch(function (err) {
                    console.log('ERROR!!!', err);
                    done.fail('Error');
                });

        });
    });
});
