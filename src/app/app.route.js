/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../typings/angularjs/angular-resource.d.ts" />
var oraj360;
(function (oraj360) {
    "use strict";
    function routes($routeProvider) {
        $routeProvider.when('/', {
            redirectTo: '/login'
        }).when('/admin', {
            templateUrl: 'app/persons/admin.html',
            controller: 'PersonController',
            controllerAs: 'profile'
        }).when('/profile', {
            templateUrl: 'app/persons/profile.html'
        }).when('/about', {
            templateUrl: 'app/persons/about.html',
            controller: 'PersonController',
            controllerAs: 'profile'
        }).when('/header', {
            templateUrl: 'app/persons/unit.html'
        }).when('/login', {
            templateUrl: 'app/authentication/login.html',
            controller: 'AuthController',
            controllerAs: 'vm'
        }).when('/register', {
            templateUrl: 'app/authentication/register.html',
            controller: 'RegisterCtrl',
            controllerAs: 'register'
        }).when('/unit', {
            templateUrl: 'app/persons/unit.html'
        }).otherwise({
            redirectTo: '/'
        });
    }
    routes.$inject = ["$routeProvider"];
    angular.module("oraj360").config(routes);
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=app.route.js.map