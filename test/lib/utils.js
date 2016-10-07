define([
    'kb_common/session',
    'test/config/kbaseConfig'
], function (Session, config) {
    'use strict';
    function getToken() {
        var session = Session.make({
            loginUrl: config.loginUrl,
            cookieName: 'kbase_session'
        });

        return session.login({
            username: config.username,
            password: config.password
        })
            .then(function (session) {
                return session.token;
            });
    }
    return {
        getToken: getToken
    };
});
