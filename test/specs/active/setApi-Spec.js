define([
    'bluebird',
    'dist/amd/kb_sdk_clients/SetAPI/dev/SetAPIClient',
    'kb_common/session',
    'kb_service/utils',
    'test/config/kbaseConfig',
    'test/lib/utils'
], function (Promise, SetAPI, Session, serviceUtils, config, utils) {
    'use strict';

    var status = {
        git_commit_hash: '5a24068953cd321f702d5705e44adf2992833d4a',
        state: 'OK',
        version: '0.1.0',
        message: '',
        git_url: 'https://github.com/kbaseapps/SetAPI'
    };

    function createClient(token) {
        return new SetAPI({
            url: config.serviceWizardUrl,
            version: 'dev',
            auth: {
                token: token
            }
        });
    }


    describe('SetAPI Tests', function () {
        var token;
        beforeAll(function (done) {
            return utils.getToken()
                .then(function (result) {
                    token = result;
                    done();
                });

        });

        describe('Sanity check', function () {
            it('The module should load', function () {
                expect(SetAPI).not.toBe(null);
            });
        });
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
                var objectName = 'set_with_just_name';
                createClient(token).save_reads_set_v1({
                    workspace: config.workspaceId,
                    output_object_name: objectName,
                    data: {
                        description: '',
                        items: []
                    }
                })
                    .then(function (result) {
                        expect(result.set_info[1]).toBe(objectName);
                        done();
                        return null;
                    })
                    .catch(function (err) {
                        // console.log('ERROR!!!', err);
                        done.fail(err.message);
                    });
            });
            it('Should be able to create a set with just a name and description', function (done) {
                var objectName = 'set_with_name_and_description';
                return createClient(token).save_reads_set_v1({
                    workspace: config.workspaceId,
                    output_object_name: objectName,
                    data: {
                        description: 'this is a description',
                        items: []
                    }
                })
                    .then(function (result) {
                        expect(result.set_info[1]).toBe(objectName);
                        done();
                        return null;
                    })
                    .catch(function (err) {
                        // console.log('ERROR!!!', err);
                        done.fail(err.message);
                    });
            });
            it('Should be able to create a set with just a name and description and one item', function (done) {
                var objectName = 'set_with_name_and_description_and_one_item';
                return createClient(token).save_reads_set_v1({
                    workspace: config.workspaceId,
                    output_object_name: objectName,
                    data: {
                        description: 'this is a description',
                        items: [{
                                ref: config.readsObject1,
                                label: 'A label'
                            }]
                    }
                })
                    .then(function (result) {
                        expect(result.set_info[1]).toBe(objectName);
                        done();
                        return null;
                    })
                    .catch(function (err) {
                        // console.log('ERROR!!!', err);
                        done.fail(err.message);
                    });
            });
            it('Should be able to create a set with just a name and description and four items', function (done) {
                var objectName = 'set_with_name_and_description_and_one_item';
                return createClient(token).save_reads_set_v1({
                    workspace: config.workspaceId,
                    output_object_name: objectName,
                    data: {
                        description: 'this is a description',
                        items: [{
                                ref: config.readsObject1,
                                label: 'A label'
                            },
                            {
                                ref: config.readsObject2,
                                label: 'A label'
                            },
                            {
                                ref: config.readsObject3,
                                label: 'A label'
                            },
                            {
                                ref: config.readsObject4,
                                label: 'A label'
                            }]
                    }
                })
                    .then(function (result) {
                        expect(result.set_info[1]).toBe(objectName);
                        done();
                        return null;
                    })
                    .catch(function (err) {
                        // console.log('ERROR!!!', err);
                        done.fail(err.message);
                    });
            });
        });

        describe('Create a set with just a name, various problem cases', function () {
            it('Should NOT be able to create a set with 0-length name', function (done) {
                var objectName = '';
                return createClient(token).save_reads_set_v1({
                    workspace: config.workspaceId,
                    output_object_name: objectName,
                    data: {
                        description: '',
                        items: []
                    }
                })
                    .then(function (result) {
                        done.fail('Error - unexpected success!');
                        return null;
                    })
                    .catch(function (err) {
                        expect(err.message).toBe('Object name cannot be null or the empty string');
                        done();
                    });
            });
            it('Should NOT be able to create a set with just spaces in name', function (done) {
                var objectName = '   ';
                return createClient(token).save_reads_set_v1({
                    workspace: config.workspaceId,
                    output_object_name: objectName,
                    data: {
                        description: '',
                        items: []
                    }
                })
                    .then(function (result) {
                        done.fail('Error - unexpected success!');
                        return null;
                    })
                    .catch(function (err) {
                        expect(err.message).toMatch(/^Illegal character in object name/);
                        done();
                    });
            });
            it('Should NOT be able to create a set with null name', function (done) {
                var objectName = null;
                return createClient(token).save_reads_set_v1({
                    workspace: config.workspaceId,
                    output_object_name: objectName,
                    data: {
                        description: '',
                        items: []
                    }
                })
                    .then(function (result) {
                        done.fail('Error - unexpected success!');
                        return null;
                    })
                    .catch(function (err) {
                        expect(err.message).toBe('Object name cannot be null or the empty string');
                        done();
                    });
            });
            it('Should NOT be able to create a set which is an invalid workspace object name', function (done) {
                var objectName = 'well,hello';
                return createClient(token).save_reads_set_v1({
                    workspace: config.workspaceId,
                    output_object_name: objectName,
                    data: {
                        description: '',
                        items: []
                    }
                })
                    .then(function (result) {
                        done.fail('Error - unexpected success!');
                        return null;
                    })
                    .catch(function (err) {
                        expect(err.message).toMatch(/^Illegal character in object name/);
                        done();
                    });
            });
            it('Should NOT be able to create a set which has an integer for a name', function (done) {
                var objectName = '123';
                return createClient(token).save_reads_set_v1({
                    workspace: config.workspaceId,
                    output_object_name: objectName,
                    data: {
                        description: '',
                        items: []
                    }
                })
                    .then(function (result) {
                        done.fail('Error - unexpected success!');
                        return null;
                    })
                    .catch(function (err) {
                        expect(err.message).toMatch(/^Object names cannot be integers/);
                        done();
                    });
            });
            it('Should NOT be able to create a set which has a negative integer for a name', function (done) {
                var objectName = '-123';
                return createClient(token).save_reads_set_v1({
                    workspace: config.workspaceId,
                    output_object_name: objectName,
                    data: {
                        description: '',
                        items: []
                    }
                })
                    .then(function (result) {
                        done.fail('Error - unexpected success!');
                        return null;
                    })
                    .catch(function (err) {
                        expect(err.message).toMatch(/^Object names cannot be integers/);
                        done();
                    });
            });
            it('Should be able to create a set which has a float for a name', function (done) {
                var objectName = '123.456';
                return createClient(token).save_reads_set_v1({
                    workspace: config.workspaceId,
                    output_object_name: objectName,
                    data: {
                        description: '',
                        items: []
                    }
                })
                    .then(function (result) {
                        expect(result.set_info[1]).toBe(objectName);
                        done();
                        return null;
                    })
                    .catch(function (err) {
                        // console.log('ERROR!!!', err);
                        done.fail(err.message);
                    });
            });
            it('Should NOT be able to create a set with a very long name', function (done) {
                var objectName = (function () {
                    var x = '';
                    for (var i = 0; i < 256; i += 1) {
                        x += 'a';
                    }
                    return x;
                }());
                return createClient(token).save_reads_set_v1({
                    workspace: config.workspaceId,
                    output_object_name: objectName,
                    data: {
                        description: '',
                        items: []
                    }
                })
                    .then(function (result) {
                        done.fail('Error - unexpected success!');
                        return null;
                    })
                    .catch(function (err) {
                        expect(err.message).toMatch(/^Object name exceeds the maximum length of 255$/);
                        done();
                    });
            });
            it('Should  be able to create a set with a name just at the length limit of 255', function (done) {
                var objectName = (function () {
                    var x = '';
                    for (var i = 0; i < 255; i += 1) {
                        x += 'a';
                    }
                    return x;
                }());
                return createClient(token).save_reads_set_v1({
                    workspace: config.workspaceId,
                    output_object_name: objectName,
                    data: {
                        description: '',
                        items: []
                    }
                })
                    .then(function (result) {
                        expect(result.set_info[1]).toBe(objectName);
                        done();
                        return null;
                    })
                    .catch(function (err) {
                        // console.log('ERROR!!!', err);
                        done.fail(err.message);
                    });
            });
        });

        describe('Create a set with description, various problem cases', function () {
            it('Should be able to create a set with null description, or should we?', function (done) {
                var description = null;
                return createClient(token).save_reads_set_v1({
                    workspace: config.workspaceId,
                    output_object_name: 'description_test',
                    data: {
                        description: description,
                        items: []
                    }
                })
                    .then(function (result) {
                        expect(result.set_info[1]).toBe('description_test');
                        done();
                        return null;
                    })
                    .catch(function (err) {
                        // console.log('ERROR!!!', err);
                        done.fail(err.message);
                    });
            });
            /*
             * The description is stored in metadata and the length is limited to 900 - description.length = 889 bytes
             */
            it('Should NOT be able to create a set with a description length exceeding 884 bytes', function (done) {
                var description = (function () {
                    var x = '';
                    for (var i = 0; i < 890; i += 1) {
                        x += 'a';
                    }
                    return x;
                }());
                return createClient(token).save_reads_set_v1({
                    workspace: config.workspaceId,
                    output_object_name: 'description_test',
                    data: {
                        description: description,
                        items: []
                    }
                })
                    .then(function (result) {
                        done.fail('Error - unexpected success!');
                        return null;
                    })
                    .catch(function (err) {
                        expect(err.message).toMatch(/Total size of metadata key \+ value exceeds maximum of/);
                        done();
                    });
            });
            it('Should be able to create a set with a description length 884 bytes', function (done) {
                var description = (function () {
                    var x = '';
                    for (var i = 0; i < 889; i += 1) {
                        x += 'a';
                    }
                    return x;
                }());
                return createClient(token).save_reads_set_v1({
                    workspace: config.workspaceId,
                    output_object_name: 'description_test',
                    data: {
                        description: description,
                        items: []
                    }
                })
                    .then(function (result) {
                        expect(result.set_info[1]).toBe('description_test');
                        done();
                        return null;
                    })
                    .catch(function (err) {
                        // console.log('ERROR!!!', err);
                        done.fail(err.message);
                    });
            });
        });
        describe('Create a set with reads set, various problem cases', function () {
            function doTest(token, items) {
                return createClient(token).save_reads_set_v1({
                    workspace: config.workspaceId,
                    output_object_name: 'items_test',
                    data: {
                        description: 'items test',
                        items: []
                    }
                });
            }
            it('Should be able to create a set with no items', function (done) {
                var items = [];
                doTest(token, items)
                    .then(function (result) {
                        expect(result.set_info[1]).toBe('items_test');
                        done();
                        return null;
                    })
                    .catch(function (err) {
                        // console.log('ERROR!!!', err);
                        done.fail(err.message);
                    });
            });
            it('Should be able to create a set with a null item', function (done) {
                var items = null;
                doTest(token, items)
                    .then(function (result) {
                        expect(result.set_info[1]).toBe('items_test');
                        done();
                        return null;
                    })
                    .catch(function (err) {
                        // console.log('ERROR!!!', err);
                        done.fail(err.message);
                    });
            });
            it('Should NOT be able to create a set with duplicate items', function (done) {
                var items = [config.readsObject1, config.readsObject1];
                doTest(token, items)
                    .then(function (result) {
                        done.fail('Error - unexpected success!');
                        // console.log('RESULT', result);
                        return null;
                    })
                    .catch(function (err) {
                        expect(err.message).toMatch(/SOME ERROR MESSAGE/);
                        done();
                    });
            });
        });
        //    string ref;
        //        boolean include_item_info;
        //        list <string> ref_path_to_set;
        // Moving on to set then get...
        describe('Create and then get', function () {
            it('should be able to create a set with a given name and the desc and null, then back that same object', function (done) {
                var objectName = 'set_then_get_with_just_name_rest_null', client;
                client = createClient(token);
                return client.save_reads_set_v1({
                    workspace: config.workspaceId,
                    output_object_name: objectName,
                    data: {
                        description: null,
                        items: []
                    }
                })
                    .then(function (result) {
                        expect(result.set_info[1]).toBe(objectName);
                        var readsSetInfo = serviceUtils.objectInfoToObject(result.set_info);
                        return client.get_reads_set_v1({
                            ref: readsSetInfo.ref,
                            include_item_info: 1
                        });
                    })
                    .then(function (result) {
                        // console.log('RESULT', result);
                        var readsSetInfo = serviceUtils.objectInfoToObject(result.info);
                        expect(readsSetInfo.name).toEqual(objectName);
                        expect(result.data.description).toEqual(null);
                        expect(result.data.items).toEqual([]);
                        done();
                        return null;
                    })
                    .catch(function (err) {
                        // console.log('ERROR!!!', err);
                        done.fail(err.message);
                    });
            });
            it('should be able to create a set with a given name and the desc and items null, then back that same object', function (done) {
                var objectName = 'set_then_get_with_given_name_and_desc_items_null', client;
                client = createClient(token);
                return client.save_reads_set_v1({
                    workspace: config.workspaceId,
                    output_object_name: objectName,
                    data: {
                        description: '',
                        items: null
                    }
                })
                    .then(function (result) {
                        expect(result.set_info[1]).toBe(objectName);
                        var readsSetInfo = serviceUtils.objectInfoToObject(result.set_info);
                        return client.get_reads_set_v1({
                            ref: readsSetInfo.ref,
                            include_item_info: 1
                        });
                    })
                    .then(function (result) {
                        // console.log('RESULT', result);
                        var readsSetInfo = serviceUtils.objectInfoToObject(result.info);
                        expect(readsSetInfo.name).toEqual(objectName);
                        expect(result.data.description).toEqual('');
                        expect(result.data.items).toEqual(null);
                        done();
                        return null;
                    })
                    .catch(function (err) {
                        // console.log('ERROR!!!', err);
                        done.fail(err.message);
                    });
            });

            var objectName = 'set_then_get_with_multiple_description_inputs',
                items = [],
                inputs = [
                    {desc: 'undefined', value: undefined},
                    {desc: 'null', value: null},
                    {desc: 'empty string', value: ''},
                    {desc: 'single space', value: ' '},
                    {desc: 'single character', value: 'a'},
                    {desc: 'three characters', value: 'abc'}
                ],
                runTest = function (input) {
                    return new Promise(function (resolve) {
                        it('should be able to create a set with a given name and items with description set to ' + input.desc, function (done) {
                            var client = createClient(token);
                            client.save_reads_set_v1({
                                workspace: config.workspaceId,
                                output_object_name: objectName,
                                data: {
                                    description: input.value,
                                    items: items
                                }
                            })
                                .then(function (result) {
                                    expect(result.set_info[1]).toBe(objectName);
                                    var readsSetInfo = serviceUtils.objectInfoToObject(result.set_info);
                                    return client.get_reads_set_v1({
                                        ref: readsSetInfo.ref,
                                        include_item_info: 1
                                    });
                                })
                                .then(function (result) {
                                    // console.log('RESULT', result);
                                    var readsSetInfo = serviceUtils.objectInfoToObject(result.info);
                                    expect(readsSetInfo.name).toEqual(objectName);
                                    expect(result.data.description).toEqual(input.value);
                                    expect(result.data.items).toEqual(items);
                                    done();
                                    resolve([true, input]);
                                    return null;
                                })
                                .catch(function (err) {
                                    // console.log('ERROR!!!', err);
                                    done.fail(err.message);
                                    resolve([false, input]);
                                    return null;
                                });
                        });
                    });
                },
                tests = inputs.map(function (input) {
                    return runTest(input);
                });

            Promise.each(tests, function (result, index, length) {
                // uncomment the following line to follow the progress...
                // console.log('RESULT', index, length, result);
            })
                .catch(function (err) {
                    console.log('OOOPS should not fail', err);
                });

            var objectName = 'set_then_get_with_multiple_items_inputs',
                description = 'set then get with multiple item inputs',
                inputs = [
                    {desc: 'undefined', value: undefined},
                    {desc: 'null', value: null},
                    {desc: 'number', value: 123},
                    {desc: 'a string', value: 'abc'},
                    {desc: 'empty array', value: []},
                    {desc: 'array with null element', value: [null]},
                    {desc: 'array with one item', value: [{
                        ref: config.readsObject1,
                        label: 'A label'
                    }]},
                    {desc: 'array with one item with no label', value: [{
                        ref: config.readsObject1
                    }]},
                    {desc: 'array with one item with null label', value: [{
                        ref: config.readsObject1,
                        label: null
                    }]},
                    {desc: 'array with one item with ubtger label', value: [{
                        ref: config.readsObject1,
                        label: 123
                    }]}
                ],
                runTest = function (input) {
                    return new Promise(function (resolve) {
                        it('should be able to create a set with a given name and description with items set to ' + input.desc, function (done) {
                            var client = createClient(token);
                            client.save_reads_set_v1({
                                workspace: config.workspaceId,
                                output_object_name: objectName,
                                data: {
                                    description: description,
                                    items: input.value
                                }
                            })
                                .then(function (result) {
                                    expect(result.set_info[1]).toBe(objectName);
                                    var readsSetInfo = serviceUtils.objectInfoToObject(result.set_info);
                                    return client.get_reads_set_v1({
                                        ref: readsSetInfo.ref,
                                        include_item_info: 0
                                    });
                                })
                                .then(function (result) {
                                    // console.log('RESULT', result);
                                    var readsSetInfo = serviceUtils.objectInfoToObject(result.info);
                                    expect(readsSetInfo.name).toEqual(objectName);
                                    expect(result.data.description).toEqual(description);
                                    expect(result.data.items).toEqual(input.value);
                                    done();
                                    resolve([true, input]);
                                    return null;
                                })
                                .catch(function (err) {
                                    // console.log('ERROR!!!', err);
                                    done.fail(err.name + ' - ' + err.message);
                                    resolve([false, input]);
                                    return null;
                                });
                        });
                    });
                },
                tests = inputs.map(function (input) {
                    return runTest(input);
                });

            Promise.each(tests, function (result, index, length) {
                // uncomment the following line to follow the progress...
                // console.log('RESULT', index, length, result);
            })
                .catch(function (err) {
                    console.log('OOOPS should not fail', err);
                });


        });
    });
});
