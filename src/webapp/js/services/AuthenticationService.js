(function () {
    'use strict';

    var rangoutAuthentication = angular.module('rangoutAuthentication', []);

    rangoutAuthentication.service('AuthenticationService', function ($q, $http, $cookies) {
        var self = this;

        self.login = function (employee) {
            var deferred = $q.defer();

            $http.post('/rangout-server/api/login', employee).then(
                function (info) {
                    deferred.resolve(info);
                }, function () {
                    deferred.reject(employee);
                }
            );

            return deferred.promise;
        };

        self.setCredentials = function (employee) {
            $http.defaults.headers.common['X-Auth-Token'] = employee.token;
            $cookies.putObject('currentEmployee', employee);
        };

        self.clearCredentials = function () {
            $cookies.remove('currentEmployee');
            $http.defaults.headers.common['X-Auth-Token'] = undefined;
        };
    });
})();
