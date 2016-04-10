(function () {
    'use strict';

    var rangoutLogin = angular.module('rangoutLogin', []);

    rangoutLogin.controller('LoginController', function ($state, AuthenticationService, ToastService) {
        var vm = this;

        vm.employee = {};
        vm.employee.establishment;
        vm.employee.username;
        vm.employee.password;

        vm.password;

        vm.login = function () {
            vm.employee.password = sha256(vm.password);

            AuthenticationService.login(vm.employee).then(
                function () {
                    AuthenticationService.setCredentials(vm.employee);
                    ToastService.customToast("Bem-vindo ao Rangout!");
                    $state.go('rangout.dashboard');
                }, function () {
                    ToastService.customToast("Ocorreu um erro. Tente novamente.");
                }
            );
        };
    });
})();
