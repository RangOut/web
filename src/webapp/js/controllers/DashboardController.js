(function () {
    'use strict';

    var rangoutDashboard = angular.module('rangoutDashboard');

    rangoutDashboard.controller('DashboardController', function ($state, $cookies, DashboardService) {
        var vm = this;

        /**
         * Could have used ui-sref on the html, but it messes with the button
         * styles.
         */
        vm.changeState = function (state) {
            $state.go(state);
        };

        vm.logout = function () {
            DashboardService.logout();
            $state.go('login');
        };

        vm.canShowEmployeesButton = function () {
            var currentEmployee = $cookies.getObject('currentEmployee');

            return currentEmployee.role.indexOf('ROLE_MANAGER') > -1;
        };
    });
})();
