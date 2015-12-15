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
        function AuthController(authentication, $location, $timeout, $rootScope) {
            this.$location = $location;
            this.$timeout = $timeout;
            this.$rootScope = $rootScope;
            this.login = new LoginCredentials();
            this.myService = authentication;
            this.location = $location;
            this.myService.isAuthorized() ? $location.path("/about") : $location.path("/login");
        }
        AuthController.prototype.logIn = function (login) {
            this.login = login;
            var that = this;
            window.sessionStorage.setItem("username", that.login.username);
            that.$rootScope.$broadcast("user", { any: that.login.username });
            this.$timeout(function () {
                that.$location.path('/about');
            }, 1000);
        };
        AuthController.prototype.logout = function () {
            window.sessionStorage.clear();
        };
        AuthController.$inject = ["AuthService", "$location", "$timeout", "$rootScope"];
        return AuthController;
    })();
    oraj360.AuthController = AuthController;
    angular.module("oraj360").controller("AuthController", AuthController);
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=auth.controller.js.map