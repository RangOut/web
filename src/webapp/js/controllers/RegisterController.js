(function () {
    'use strict';

    var rangoutRegister = angular.module('rangoutRegister');

    rangoutRegister.controller('RegisterController', function (RegisterService, ToastService) {
        var vm = this;

        vm.establishment = {};
        vm.establishment.name;
        vm.establishment.nickname;
        vm.establishment.telephones = [];
        vm.establishment.address = {};
        vm.establishment.address.cep;
        vm.establishment.address.street;
        vm.establishment.address.number;
        vm.establishment.address.neighborhood;
        vm.establishment.address.city;
        vm.establishment.address.state;
        vm.establishment.address.country;
        vm.establishment.address.complement;
        vm.establishment.manager = {};
        vm.establishment.manager.name;
        vm.establishment.manager.username;
        vm.establishment.manager.email;
        vm.establishment.manager.password;
        vm.establishment.menu = [];

        vm.password;

        vm.addItemMenu = function () {
            vm.establishment.menu.push({
                name: undefined,
                price: undefined,
                category: undefined,
                ingredients: [],
                description: undefined
            });
        };

        vm.removeItemMenu = function (index) {
            vm.establishment.menu.splice(index, 1);
        };

        vm.register = function () {
            vm.establishment.manager.password = sha256(vm.password);

            RegisterService.register(vm.establishment).then(
                function () {
                    ToastService.customToast("Registro concluído com sucesso!");
                    $state.go('rangout.login');
                }, function () {
                    ToastService.customToast("Ocorreu um erro. Tente novamente.");
                }
            );
        };

        (function main() {
            vm.addItemMenu();
        })();
    });
})();
