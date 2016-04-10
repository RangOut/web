(function () {
    'use strict';

    var rangoutRegister = angular.module('rangoutRegister', []);

    rangoutRegister.controller('RegisterController', function () {
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
    });
})();
