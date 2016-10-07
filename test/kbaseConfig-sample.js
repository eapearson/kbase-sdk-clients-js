/*
 * Sample configuration file for unit tests.
 * This file should be copied to the config directory, the -sample suffix removed
 * and the values filled according to your needs.
 */
define([], function () {
    'use strict';
    
    return {
        // The unit tests require a donor kbase user account in order to 
        // conduct api call. You can use your own, or use a test account.
        username: 'username here',

        // The username + password credentials are used to generate a token.
        // Note that test/config is excluded from bit
        password: 'password here',
        
        // These service urls may need to be adjusted for your environment.
        serviceWizardUrl:  'https://ci.kbase.us/services/service_wizard',
        loginUrl: 'https://ci.kbase.us/services/authorization/Sessions/Login',
        
        // Because the apis will need access to a workspace, you will need to 
        // set up a donor workspace. This workspace may need to be populated
        // with sample data.
        // TODO: documentation, perhaps sample data files or refernce workspace
        workspaceId: 1234
    };
});
