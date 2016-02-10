/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../services/auth.service.ts"/>
module oraj360 {

    export class LoginCredentials {
        username:string;
    }

    export class AuthController {

        static $inject = ["authService", "$location", "$timeout", "$rootScope"];

        constructor(private authentication:IAuthService, private $location:ng.ILocationService, private $timeout:ng.ITimeoutService, private $rootScope,public login:LoginCredentials) {

            this.login = new LoginCredentials();


            this.authentication.isAuthorized() ? this.$location.path("/about") : this.$location.path("/login");

        }

        logIn(login):void {
            this.login = login;
            var that = this;
            window.sessionStorage.setItem("username", that.login.username);
            this.$location.path('/about');
        }

        logout():void {
            window.sessionStorage.clear();
        }
    }
    angular.module("oraj360")
        .controller("AuthController", AuthController);


}
