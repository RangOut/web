(function () {
    'use strict';

    var app = angular.module('rangoutApp', [
        'ui.router', 'angular-loading-bar', 'blockUI', 'ngMaterial', 'ngAnimate', 'ngResource', 'ngSanitize', 'ngCookies',
        'ngStorage', 'ngMessages', 'ngAria', 'rangoutLogin'
    ]);

    app.config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('cyan');
    });

    app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: '/rangout/views/login.html',
                controller: 'LoginController as loginCtrl'
            })
            .state('register', {
                url: '/register'
            })
            .state('forgot', {
                url: '/forgot'
            })
            .state('rangout', {
                abstract: true
            });

        /**
         * FIXME: Create root state '/' to check state of user and send him to the appropriate route.
         * After that, make '/' default route.
         */
        $urlRouterProvider.when('', '/login');
        $urlRouterProvider.otherwise('/login');

        $locationProvider.html5Mode(true);
    });
})();
