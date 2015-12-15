/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../services/auth.service.ts"/>
module oraj360 {

    export class LoginCredentials {
        username:string;
    }

    export class AuthController {
        private login:LoginCredentials;
        private myService:IAuthService;
        private location:ng.ILocationService;

        static $inject = ["AuthService", "$location", "$timeout", "$rootScope"];

        constructor(authentication:IAuthService, private $location:ng.ILocationService, private $timeout:ng.ITimeoutService, private $rootScope) {

            this.login = new LoginCredentials();
            this.myService = authentication;
            this.location = $location;

            this.myService.isAuthorized() ? $location.path("/about") : $location.path("/login");

        }

        logIn(login):void {
            this.login = login;
            var that = this;
            window.sessionStorage.setItem("username", that.login.username);
            that.$rootScope.$broadcast("user", {any: that.login.username});
            this.$timeout(function () {
                that.$location.path('/about')
            }, 1000)


        }

        logout():void {
            window.sessionStorage.clear();
        }
    }
    angular.module("oraj360")
        .controller("AuthController", AuthController);


}
