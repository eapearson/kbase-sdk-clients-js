var requirejs = require('requirejs');

requirejs.config({
    nodeRequire: require,
    baseUrl: __dirname + '/lib'
});

var catalogUrl = 'https://ci.kbase.us/services/catalog';
var w = process.stdout.write;


requirejs([
    'bluebird',
    'kb/service/client/catalog'
], function (Promise, Catalog) {
    var cat = new Catalog(catalogUrl);
    var modules = [
        'TaxonAPI',
        'GenomeAnnotationAPI',
        'AssemblyAPI'
    ];
    var params = {
        module_name: 'TaxonAPI'
    }

    return Promise.all(modules.map(function (module) {
        return cat.list_released_module_versions({
            module_name: module
        });
    }))
        .then(function (result) {
            result.forEach(function (result, index) {
                console.log(modules[index]);
                console.log(result);
            });
        })
            .catch(function (err) {
                console.error('ERROR!', err);
        });


});
