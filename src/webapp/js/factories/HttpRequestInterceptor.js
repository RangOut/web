(function () {
    'use strict';

    var rangoutHttpRequestInterceptor = angular.module('rangoutHttpRequestInterceptor', []);

    rangoutHttpRequestInterceptor.factory('HttpRequestInterceptor', function ($cookies) {
        return {
            request: function (config) {
                var currentEmployee = $cookies.getObject('currentEmployee');

                if (typeof currentEmployee !== 'undefined') {
                    config.headers['X-Auth-Token'] = currentEmployee.token;
                }

                return config;
            }
        };
    });
})();
