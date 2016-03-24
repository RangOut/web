(function () {
    'use strict';

    var rangoutLogin = angular.module('rangoutLogin', []);

    rangoutLogin.controller('LoginController', function ($rootScope) {
        var vm = this;

        vm.user = {};
    });
})();
