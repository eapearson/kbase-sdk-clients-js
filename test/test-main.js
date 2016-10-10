var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/-[sS]pec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base',
    // dynamically load all test files
    deps: tests,
    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});


function addCdnModules(baseUrl) {
    if (!baseUrl) {
        // baseUrl = 'https://ci.kbase.us/cdn/files';
        // baseUrl = 'http://cdn.kbase.us/cdn';
        baseUrl = 'http://localhost:10001';
    }
    var modules = {
        kb_common: 'kbase-common-js/1.9.0/',
        kb_service: 'kbase-service-clients-js/2.10.0/',
        uuid: 'pure-uuid/1.4.0/uuid',
        requirejs: 'requirejs/2.3.2',
        text:  'requirejs-text/2.0.15/text',
        css: 'require-css/0.1.8/css',
        'font-awesome': 'font-awesome/4.3.0/css/font-awesome',
        bluebird: 'bluebird/3.4.6/bluebird',
        jquery: 'jquery/2.2.4/jquery',
        bootstrap: 'bootstrap/3.3.7/js/bootstrap',
        bootstrap_css: 'bootstrap/3.3.7/css/bootstrap'
        },
        paths = {};

    Object.keys(modules).forEach(function (key) {
        paths[key] = [baseUrl, modules[key]].join('/');
    });

    require.config({
        paths: paths
    });
}
addCdnModules();