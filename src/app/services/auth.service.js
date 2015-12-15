/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
var oraj360;
(function (oraj360) {
    var AuthService = (function () {
        function AuthService(restangulars, $location) {
            this.restangulars = restangulars;
            this.$location = $location;
            this.username = window.sessionStorage.getItem("username");
            if (this.username !== null) {
                this.setAuthorized(true);
            }
            else {
                $location.path('/login');
            }
        }
        AuthService.prototype.logIn = function (credentials) {
            return this.restangulars.all("persons").getList();
        };
        AuthService.prototype.setAuthorized = function (isLogged) {
            this.logged = isLogged;
        };
        AuthService.prototype.isAuthorized = function () {
            return this.logged;
        };
        AuthService.$inject = ["PersonRestangular", "$location"];
        return AuthService;
    })();
    oraj360.AuthService = AuthService;
    angular.module("oraj360").service("AuthService", AuthService);
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=auth.service.js.map