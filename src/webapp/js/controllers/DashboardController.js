(function () {
    'use strict';

    var rangoutDashboard = angular.module('rangoutDashboard', []);

    rangoutDashboard.controller('DashboardController', function ($state) {
        var vm = this;

        /**
         * Could have used ui-sref on the html, but it messes with the button
         * styles.
         */
        vm.changeState = function (state) {
            $state.go(state);
        };
    });
})();
