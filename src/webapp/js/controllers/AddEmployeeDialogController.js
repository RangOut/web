(function () {
    'use strict';

    var rangoutDashboard = angular.module('rangoutDashboard');

    rangoutDashboard.controller('AddEmployeeDialogController', function ($mdDialog, newEmployee) {
        var vm = this;

        vm.password;
        vm.employee = newEmployee;

        vm.cancel = function () {
            $mdDialog.cancel();
        };

        vm.confirm = function () {
            newEmployee.password = sha256(vm.password);
            $mdDialog.hide(vm.newEmployee);
        };
    });
})();
