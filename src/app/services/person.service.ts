/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />

/// <reference path="../services/auth.service.ts"/>
/// <reference path="../persons/person.controller.ts"/>

module oraj360 {

    export interface IPersonService {
        username:string;
        person:Person;


        getAll() : ng.IPromise<{}>;
        getPerson(): Person;
        setPerson(person:Person);
        updatePerson(person:Person):ng.IPromise<{}>;
        savePerson(person:Person):ng.IPromise<{}>;
        deletePerson(username:string):ng.IPromise<{}>;
        getPersonByUsername(username:string):ng.IPromise<{}>;
        getPersonByLink(href:string):ng.IPromise<{}>;

    }

    export class PersonService implements IPersonService {

        person:Person;
        username = window.sessionStorage.getItem("username");
        private restService:restangular.IService;
        private authService:IAuthService;
        private persons:restangular.IElement;

        static $inject = ["PersonRestangular", "$location", "AuthService"];

        constructor(personRestService:restangular.IService, private $location:ng.ILocationService, authentication:IAuthService) {
            this.restService = personRestService;
            var that = this;
            this.authService = authentication;

            if (this.authService.isAuthorized()) {
                this.persons = this.restService.all("persons");

                this.persons.one(this.username).get().then(function (data) {
                    that.setPerson(data);
                });


            }
        }


        getAll():ng.IPromise<{}> {
            return undefined;
        }

        getPerson():Person {
            return this.person;
        }

        setPerson(person:Person) {
            this.person = person;
        }

        updatePerson(person:any):ng.IPromise<{}> {
            // data.contactInformation = "yolo";
            //  that.persons.one(that.username).customPUT(data);
            //that.dataService.postItem("PUT", "http://localhost:9900/api/persons/" + that.username, data, "application/json");

            return this.persons.one(person.username).customPUT(person);
        }

        savePerson(person:Person):ng.IPromise<{}> {
            return undefined;
        }

        deletePerson(username:string):ng.IPromise<{}> {
            return undefined;
        }

        getPersonByUsername(username:string):ng.IPromise<{}> {
            return this.restService.all('persons').one(username).get()

        }
        getPersonByLink(href:string):ng.IPromise<{}>{
            return this.restService.oneUrl('persons',href).get();
        }


    }
    angular.module("oraj360")
        .service("PersonService", PersonService);

}
