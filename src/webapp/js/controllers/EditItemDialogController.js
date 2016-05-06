(function () {
    'use strict';

    var rangoutDashboard = angular.module('rangoutDashboard');

    rangoutDashboard.controller('EditItemDialogController', function ($mdDialog, item) {
        var vm = this;

        vm.item = item;

        vm.cancel = function () {
            $mdDialog.cancel();
        };

        vm.confirm = function () {
            $mdDialog.hide(vm.item);
        };
    });
})();
