(function () {
    'use strict';

    var rangoutToast = angular.module('rangoutToast', []);

    rangoutToast.service('ToastService', function ($mdToast) {
        var self = this;

        self.customToast = function (message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('top right')
                    .hideDelay(3000)
            );
        };
    });
})();
