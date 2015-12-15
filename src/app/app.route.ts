/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
module oraj360 {
    "use strict";

    function routes($routeProvider:ng.route.IRouteProvider) {

        $routeProvider
            .when('/', {
                redirectTo: '/login'
            })
            .when('/about', {
                templateUrl: 'app/persons/profile.html',
                controller: 'PersonController',
                controllerAs: 'profile',
                resolve: {}

            })
            .when('/profile', {
                templateUrl: 'app/persons/profile.html',
                controller: 'PersonController',
                controllerAs: 'profile'
            })
            .when('/header', {
                templateUrl: 'app/persons/unit.html'
            })
            .when('/login', {
                templateUrl: 'app/authentication/login.html',
                controller: 'AuthController',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: 'app/authentication/register.html',
                controller: 'RegisterCtrl',
                controllerAs: 'register'
            })
            .when('/unit', {
                templateUrl: 'app/persons/unit.html'
            })
            .otherwise({
                redirectTo: '/'
            });


    }

    routes.$inject = ["$routeProvider"];

    angular.module("oraj360")
        .config(routes);
}