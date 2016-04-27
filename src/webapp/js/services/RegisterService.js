(function () {
    'use strict';

    var rangoutRegister = angular.module('rangoutRegister', []);

    rangoutRegister.service('RegisterService', function ($q, $http) {
        var self = this;

        self.register = function (establishment) {
            var deferred = $q.defer();

            $http.post('/rangout-server/api/register', {establishment: establishment}).then(
                function () {
                    deferred.resolve(establishment);
                }, function () {
                    deferred.reject(establishment);
                }
            );

            return deferred.promise;
        };
    });
})();
