(function () {
    'use strict';

    var rangoutRegister = angular.module('rangoutRegister', []);

    rangoutRegister.service('RegisterService', function ($q, $http) {
        var self = this;

        self.register = function (establishment) {
            var deferred = $q.defer();

            $http.post('/rangout-server/api/register', {establishment: establishment}).then(
                function () {
                    console.log('Register request ok.');
                    deferred.resolve(establishment);
                }, function () {
                    console.log('Register request fail.');
                    deferred.reject(establishment);
                }
            );

            return deferred.promise;
        };
    });
})();
