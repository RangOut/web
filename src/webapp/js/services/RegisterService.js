(function () {
    'use strict';

    var rangoutRegister = angular.module('rangoutRegister', []);

    rangoutRegister.service('RegisterService', function ($q, $http) {
        var self = this;

        self.register = function (establishment) {
            var deferred = $q.defer();

            $http.post('/rangout-server/api/register', {establishment: establishment}).then(
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
