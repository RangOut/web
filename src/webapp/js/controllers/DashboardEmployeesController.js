(function () {
    'use strict';

    var rangoutDashboard = angular.module('rangoutDashboard');

    rangoutDashboard.controller('DashboardEmployeesController', function ($q, $cookies, DashboardService, DialogService) {
        var vm = this;
        var idEstablishment;

        vm.employees;

        vm.openAddEmployeeDialog = function (event) {
            var deferred = $q.defer();
            var newEmployee = {};
            newEmployee.name;
            newEmployee.username;
            newEmployee.password;

            var dialogPromise = DialogService.customDialog(
                'AddEmployeeDialogController as addEmployeeDialogCtrl',
                '/rangout/views/addEmployeeDialog.html',
                event,
                {
                    newEmployee: newEmployee
                }
            );

            dialogPromise.then(
                function (info) {
                    DashboardService.postEmployee(idEstablishment, newEmployee).then(
                        function (otherInfo) {
                            vm.employees.push(otherInfo.data.employee);
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

        vm.openRemoveEmployeeDialog = function (employee, event) {
            var deferred = $q.defer();

            var dialogPromise = DialogService.confirmDialog(
                'Remover Funcionário',
                'Deseja remover esse funcionário?',
                event,
                'Sim',
                'Não'
            );

            dialogPromise.then(
                function (info) {
                    DashboardService.deleteEmployee(employee.id).then(
                        function (otherInfo) {
                            vm.employees.splice(employee, 1);
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

            DashboardService.getEmployees(idEstablishment).then(
                function (info) {
                    vm.employees = info.data.employees;
                }
            );
        })();
    });
})();
