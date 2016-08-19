# KBase SDK Javascript Clients

This project provides a set of AMD modules which provide the Javascript clients for KBase "dynamic services" as well as the universal Generic Client.

It operates by building the the clients for all known services for all known versions of those services.

The clients are built using the KBase SDK tool. The generated clients are wrapped in AMD modules, and the jQuery AJAX promise is wrapped in a Bluebird promise object, since that is the defacto standard library used at KBase.

The libraries are available in two forms -- the developer-friendly source files and the minified files.

## Organization of Modules

The top level module component is kb_sdk. This provides for compatibility with a CDN style distribution.

Within kb_sdk will be universal modules, including the Generic Client.

Dynamic service clients are provided by uniquely named modules.

Clients for module releases are available by semver tag.

E.g.

kb_dynamic_services/mymodule/0.1.0/client.js

This allows multiple client versions to be supported in the runtime concurrently. 

Clients for dev and beta tags are available for the specific tip commit at the time of building the client libraries.

kb_dynamic_services/mymodule/dev/client.js
kb_dynamic_services/mymodule/beta/client.js

This scheme has implications for both developer and deployment workflows:

### Developer

The library is not targeted at dynamic service developers per se, but for developers who depend on dynamic services. T

For local development, the developer may rebuild a local client library when they know that a new version of a dynamic service dependency has been registered.  This will work for dev and beta tags, since the and therefore pick up any client changes immediately. The kbase-ui can be configured to link to a local library directory rather than the built-in bower-supplied directory.

For shared-server based development, it is 

