/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />

module oraj360 {

    export interface IAuthService {
        username:string;
        logged:boolean;
        setAuthorized(isLogged:boolean):void;
        isAuthorized():boolean;
        logIn(credentials:any) : ng.IPromise<{}>;
    }

    export class AuthService implements IAuthService {

        username = window.sessionStorage.getItem("username");
        logged:boolean;

        static $inject = ["PersonRestangular", "$location"];

        constructor(private restangulars:restangular.IService, private $location:ng.ILocationService) {
            if (this.username !== null) {
                this.setAuthorized(true);
            }
            else {
                $location.path('/login');

            }
        }

        logIn(credentials:any):ng.IPromise<{}> {
            return this.restangulars.all("persons").getList();

        }

        setAuthorized(isLogged:boolean):void {
            this.logged = isLogged;
        }

        isAuthorized():boolean {
            return this.logged;
        }
    }
    angular.module("oraj360")
        .service("AuthService", AuthService);

}
