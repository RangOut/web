(function () {
    'use strict';

    var rangoutAuthentication = angular.module('rangoutAuthentication', []);

    rangoutAuthentication.service('AuthenticationService', function ($q, $http, $cookies) {
        var self = this;

        self.login = function (user) {
            var deferred = $q.defer();

            $http.post('/rangout-server/api/authenticate', {user: user}).then(
                function () {
                    console.log('Authenticate request ok.');
                    deferred.resolve(user);
                }, function () {
                    console.log('Authenticate request fail.');
                    deferred.reject(user);
                }
            );

            return deferred.promise;
        };

        self.setCredentials = function (user) {
            $cookies.putObject('currentUser', user);
        };

        self.clearCredentials = function () {
            $cookies.remove('currentUser');
        };
    });
})();
