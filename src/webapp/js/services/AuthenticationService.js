(function () {
    'use strict';

    var rangoutAuthentication = angular.module('rangoutAuthentication', []);

    rangoutAuthentication.service('AuthenticationService', function ($q, $http, $cookies) {
        var self = this;

        self.login = function (employee) {
            var deferred = $q.defer();

            $http.post('/rangout-server/api/login', {employee: employee}).then(
                function () {
                    console.log('Authenticate request ok.');
                    deferred.resolve(employee);
                }, function () {
                    console.log('Authenticate request fail.');
                    deferred.reject(employee);
                }
            );

            return deferred.promise;
        };

        self.setCredentials = function (employee) {
            $cookies.putObject('currentEmployee', employee);
        };

        self.clearCredentials = function () {
            $cookies.remove('currentEmployee');
        };
    });
})();
