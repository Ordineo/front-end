/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />

module oraj360 {

    export interface IAuthService {
        username:string;
        logged:boolean;
        setAuthorized(isLogged:boolean):void;
        isAuthorized():boolean;
    }

    export class AuthService implements IAuthService {

        static $inject = ["PersonRestangular", "$location"];

        constructor(private restangulars:restangular.IService, private $location:ng.ILocationService,public username:string,public logged:boolean) {

            this.username =window.sessionStorage.getItem("username");

            if (this.username !== null) {
                this.setAuthorized(true);
            }
            else {
                $location.path('/login');

            }
        }

        setAuthorized(isLogged:boolean):void {
            this.logged = isLogged;
        }

        isAuthorized():boolean {
            return this.logged;
        }
    }
    angular.module("oraj360")
        .service("authService", AuthService);

}
