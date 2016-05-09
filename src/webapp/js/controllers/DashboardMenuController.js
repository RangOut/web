(function () {
    'use strict';

    var rangoutDashboard = angular.module('rangoutDashboard');

    rangoutDashboard.controller('DashboardMenuController', function ($q, $cookies, DashboardService, DialogService) {
        var vm = this;
        var idEstablishment;

        vm.menu;

        vm.openAddItemDialog = function (event) {
            var deferred = $q.defer();
            var newItem = {};
            newItem.name;
            newItem.price;
            newItem.description;
            newItem.category;
            newItem.ingredients;
            newItem.available;

            var dialogPromise = DialogService.customDialog(
                'EditItemDialogController as editItemDialogCtrl',
                '/rangout/views/editItemDialog.html',
                event,
                {
                    item: newItem
                }
            );

            dialogPromise.then(
                function (info) {
                    DashboardService.postItemMenu(newItem).then(
                        function (otherInfo) {
                            vm.menu = otherInfo.data.menu;
                            deferred.resolve(otherInfo);
                        }, function (error) {
                            deferred.reject(error);
                        }
                    );
                }, function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise
        };

        vm.openEditItemDialog = function (item, event) {
            var deferred = $q.defer();
            var menuBackup = angular.copy(vm.menu);

            var dialogPromise = DialogService.customDialog(
                'EditItemDialogController as editItemDialogCtrl',
                '/rangout/views/editItemDialog.html',
                event,
                {
                    item: item
                }
            );

            dialogPromise.then(
                function (info) {
                    DashboardService.putItemMenu(item).then(
                        function (otherInfo) {
                            deferred.resolve(otherInfo);
                        }, function (error) {
                            vm.menu = menuBackup;
                            deferred.reject(error);
                        }
                    );
                }, function (error) {
                    vm.menu = menuBackup;
                    deferred.reject(error);
                }
            );

            return deferred.promise
        };

        vm.openRemoveItemDialog = function (item, event) {
            var deferred = $q.defer();

            var dialogPromise = DialogService.confirmDialog(
                'Remover Item',
                'Deseja remover esse item do cardápio?',
                event,
                'Sim',
                'Não'
            );

            dialogPromise.then(
                function (info) {
                    DashboardService.putMenu(idEstablishment, vm.menu).then(
                        function (otherInfo) {
                            vm.menu.splice(item, 1);
                            deferred.resolve(otherInfo);
                        }, function (error) {
                            deferred.reject(error);
                        }
                    );
                }, function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };

        (function main() {
            var currentEmployee = $cookies.getObject('currentEmployee');
            idEstablishment = currentEmployee.establishment.id;

            DashboardService.getMenu(idEstablishment).then(
                function (info) {
                    vm.menu = info.data.menu;
                }
            );
        })();
    });
})();
