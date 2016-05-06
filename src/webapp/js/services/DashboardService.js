(function () {
    'use strict';

    var rangoutDashboard = angular.module('rangoutDashboard', []);

    rangoutDashboard.service('DashboardService', function ($q, $http, $cookies, AuthenticationService) {
        var self = this;

        self.logout = function () {
            var deferred = $q.defer();
            var token = $cookies.getObject('currentEmployee').token;

            $http.post('/rangout-server/api/logout/', token).then(
                function (info) {
                    AuthenticationService.clearCredentials();
                    deferred.resolve(info);
                }, function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };

        self.getMenu = function (idEstablishment) {
            var deferred = $q.defer();

            $http.get('/rangout-server/api/establishment/' + idEstablishment + '/menu').then(
                function (info) {
                    deferred.resolve(info);
                }, function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };

        self.putMenu = function (idEstablishment, menu) {
            var deferred = $q.defer();

            $http.put('/rangout-server/api/establishment/' + idEstablishment + '/menu', menu).then(
                function (info) {
                    deferred.resolve(info);
                }, function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };

        self.getOrders = function () {
        };
    });
})();
