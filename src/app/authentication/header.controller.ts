/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../services/auth.service.ts"/>
/// <reference path="../authentication/auth.controller.ts"/>
/// <reference path="../persons/person.controller.ts"/>


module oraj360 {

    export class HeaderController {


        myDetails:Person;
        private authService:IAuthService;
        private personService:IPersonService;
        loggedIn:boolean;
        username = window.sessionStorage.getItem("username");


        static $inject = ["AuthService", "PersonService", "$timeout", "$rootScope"];

        constructor(authentication:IAuthService, personService:IPersonService, private $timeout:ng.ITimeoutService, private $rootScope) {

            this.personService = personService;
            this.authService = authentication;
            var that = this;

            if (this.authService.isAuthorized()) {
                this.loggedIn = true;
                $timeout(function () {
                    that.myDetails = that.personService.getPerson();
                }, 1000);

            } else {
                this.loggedIn = false;
            }

            this.$rootScope.$on("user", function (event, args) {

                $timeout(function () {
                    that.$rootScope.$apply(function () {
                        that.loggedIn = true;
                        that.personService.getPersonByUsername(args.any).then(function (data) {
                            that.setMyDetails(data);
                        });

                    });
                }, 1000);
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