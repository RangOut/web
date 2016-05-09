(function () {
    'use strict';

    var rangoutDashboard = angular.module('rangoutDashboard', []);

    rangoutDashboard.service('DashboardService', function ($q, $http, AuthenticationService) {
        var self = this;

        self.logout = function () {
            AuthenticationService.clearCredentials();
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

        self.postItemMenu = function (newItem) {
            var deferred = $q.defer();
            var payload = {
                items: [newItem]
            };

            $http.post('/rangout-server/api/establishment/menu', payload).then(
                function (info) {
                    deferred.resolve(info);
                }, function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };

        self.putItemMenu = function (item) {
            var deferred = $q.defer();

            $http.put('/rangout-server/api/establishment/menu/' + item.id, item).then(
                function (info) {
                    deferred.resolve(info);
                }, function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };

        self.getEmployees = function (idEstablishment) {
            var deferred = $q.defer();

            $http.get('/rangout-server/api/establishment/' + idEstablishment + '/employee').then(
                function (info) {
                    deferred.resolve(info);
                }, function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };

        self.postEmployee = function (idEstablishment, newEmployee) {
            var deferred = $q.defer();

            $http.post('/rangout-server/api/establishment/' + idEstablishment + '/employee', newEmployee).then(
                function (info) {
                    deferred.resolve(info);
                }, function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };

        self.deleteEmployee = function (idEmployee) {
            var deferred = $q.defer();

            $http.delete('/rangout-server/api/establishment/employee/' + idEmployee).then(
                function (info) {
                    deferred.resolve(info);
                }, function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };
    });
})();
