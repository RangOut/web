(function () {
    'use strict';

    var app = angular.module('rangoutApp', [
        'ui.router', 'angular-loading-bar', 'blockUI', 'ngMaterial', 'ngAnimate', 'ngResource', 'ngSanitize', 'ngCookies',
        'ngStorage', 'ngMessages', 'ngAria', 'rangoutToast', 'rangoutAuthentication', 'rangoutLogin', 'rangoutRegister'
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
                data: {
                    requireLogin: true
                }
            })
            .state('rangout.dashboard', {
                url: '/dashboard'
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
