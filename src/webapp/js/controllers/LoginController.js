(function () {
    'use strict';

    var rangoutLogin = angular.module('rangoutLogin', []);

    rangoutLogin.controller('LoginController', function ($state, AuthenticationService, ToastService) {
        var vm = this;

        vm.user = {};
        vm.user.establishment;
        vm.user.username;
        vm.user.password;
        vm.password;

        vm.login = function () {
            vm.user.password = sha256(vm.password);

            AuthenticationService.login(vm.user).then(
                function () {
                    AuthenticationService.setCredentials(vm.user);
                    ToastService.customToast("Logged in!");
                    $state.go('rangout.dashboard');
                }, function () {
                    ToastService.customToast("Something went wrong.");
                }
            );
        };
    });
})();
