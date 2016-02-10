/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../services/auth.service.ts"/>
/// <reference path="../authentication/auth.controller.ts"/>
/// <reference path="../persons/person.controller.ts"/>

module oraj360{

    export interface IHeaderController {
        myDetails:Person;
        username:string;
        loggedIn:boolean;
        authentication:IAuthService;
        personService:IPersonService;
        timeout:ng.ITimeoutService;
        location:ng.ILocationService;
        rootScope:any;
        setMyDetails(person:any):void;
        logout():void;
    }

    export class HeaderController {

        static $inject = ["authService", "PersonService", "$timeout", "$rootScope","$location"];

        constructor(private authentication:IAuthService, private personService:IPersonService, private $timeout:ng.ITimeoutService, private $rootScope,private $location:ng.ILocationService,public myDetails:Person, public username:string, public loggedIn:boolean ) {

            console.log('HeaderController');
            var that = this;
            username = window.sessionStorage.getItem("username");
            this.personService.getPersonByUsername(username).then(function (data) {
                that.setMyDetails(data);

            });

        }

        setMyDetails(person:any) {
            this.myDetails = person;
        }

        logout():void {
            window.sessionStorage.clear();
            window.location.reload();
        }


    }
    angular.module("oraj360")
        .controller("HeaderController", HeaderController);


}