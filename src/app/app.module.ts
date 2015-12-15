/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-route.d.ts" />
module oraj360 {
    "use strict";

    angular
        .module("oraj360", ['ngRoute', 'ngAnimate',
            'ngAria',
            'ngCookies',
            'ngMessages',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
            'ui.bootstrap',
            'restangular',
            'ngMaterial',
            'md.data.table',
            'ngMdIcons',
            'ngMap'])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.defaults.headers.common = {};
            $httpProvider.defaults.headers.post = {};
            $httpProvider.defaults.headers.put = {};
            $httpProvider.defaults.headers.patch = {};
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }
        ])
        .config(['$mdThemingProvider', function ($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('orange')
        }])
        .run(function ($rootScope, $route) {


        })

}
