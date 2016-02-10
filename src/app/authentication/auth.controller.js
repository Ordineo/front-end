/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../services/auth.service.ts"/>
var oraj360;
(function (oraj360) {
    var LoginCredentials = (function () {
        function LoginCredentials() {
        }
        return LoginCredentials;
    })();
    oraj360.LoginCredentials = LoginCredentials;
    var AuthController = (function () {
        function AuthController(authentication, $location, $timeout, $rootScope, login) {
            this.authentication = authentication;
            this.$location = $location;
            this.$timeout = $timeout;
            this.$rootScope = $rootScope;
            this.login = login;
            this.login = new LoginCredentials();
            this.authentication.isAuthorized() ? this.$location.path("/about") : this.$location.path("/login");
        }
        AuthController.prototype.logIn = function (login) {
            this.login = login;
            var that = this;
            window.sessionStorage.setItem("username", that.login.username);
            this.$location.path('/about');
        };
        AuthController.prototype.logout = function () {
            window.sessionStorage.clear();
        };
        AuthController.$inject = ["authService", "$location", "$timeout", "$rootScope"];
        return AuthController;
    })();
    oraj360.AuthController = AuthController;
    angular.module("oraj360").controller("AuthController", AuthController);
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=auth.controller.js.map