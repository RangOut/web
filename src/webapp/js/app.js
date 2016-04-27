(function () {
    'use strict';

    var app = angular.module('rangoutApp', [
        'ui.router', 'angular-loading-bar', 'blockUI', 'ngMaterial', 'ngAnimate', 'ngResource', 'ngSanitize', 'ngCookies',
        'ngStorage', 'ngMessages', 'ngAria', 'rangoutToast', 'rangoutAuthentication', 'rangoutLogin', 'rangoutRegister',
        'rangoutDashboard'
    ]);

    app.config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('cyan');
    });

    app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('/', {
                url: '/',
                controller: function ($cookies, $state) {
                    if (typeof $cookies.get('currentEmployee') === 'undefined') {
                        $state.go('login');
                    } else {
                        $state.go('rangout.dashboard');
                    }
                },
                data: {
                    requireLogin: false
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: '/rangout/views/login.html',
                controller: 'LoginController as loginCtrl',
                data: {
                    requireLogin: false
                }
            })
            .state('register', {
                url: '/register',
                templateUrl: '/rangout/views/register.html',
                controller: 'RegisterController as registerCtrl',
                data: {
                    requireLogin: false
                }
            })
            .state('rangout', {
                abstract: true,
                template: '<div class="full-height full-width" ui-view></div>',
                data: {
                    requireLogin: true
                }
            })
            .state('rangout.dashboard', {
                url: '/dashboard',
                templateUrl: '/rangout/views/dashboard.html',
                controller: 'DashboardController as dashboardCtrl'
            })
            .state('rangout.dashboard.orders', {
                url: '/orders',
                templateUrl: '/rangout/views/dashboard.orders.html',
                controller: 'DashboardOrdersController as dashboardOrdersCtrl'
            })
            .state('rangout.dashboard.menu', {
                url: '/menu',
                templateUrl: '/rangout/views/dashboard.menu.html',
                controller: 'DashboardMenuController as dashboardMenuCtrl'
            })
            .state('rangout.dashboard.employees', {
                url: '/employees',
                templateUrl: '/rangout/views/dashboard.employees.html',
                controller: 'DashboardEmployeesController as dashboardEmployeesCtrl'
            });

        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);
    });

    app.run(function ($rootScope, $state, $cookies) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
            var requireLogin = toState.data.requireLogin;

            if (requireLogin && typeof $cookies.get('currentEmployee') === 'undefined') {
                event.preventDefault();
                $state.go('login');
            }
        });
    });
})();
