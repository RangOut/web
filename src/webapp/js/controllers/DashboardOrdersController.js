(function () {
    'use strict';

    var rangoutDashboard = angular.module('rangoutDashboard');

    rangoutDashboard.controller('DashboardOrdersController', function (DashboardService) {
        var vm = this;
        
        vm.orders;
        
        (function main() {
            DashboardService.getOrders().then(
                function (info) {
                    vm.orders = info.data.openOrders;
                }
            );
        })();
    });
})();
