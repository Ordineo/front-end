/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../services/auth.service.ts"/>
/// <reference path="../persons/person.controller.ts"/>
var oraj360;
(function (oraj360) {
    var PersonService = (function () {
        function PersonService(personRestService, $location, authentication, persons, person, username) {
            this.personRestService = personRestService;
            this.$location = $location;
            this.authentication = authentication;
            this.persons = persons;
            this.person = person;
            this.username = username;
            var that = this;
            username = window.sessionStorage.getItem("username");
            if (authentication.isAuthorized()) {
                persons = personRestService.all("persons");
                persons.one(username).get().then(function (data) {
                    that.setPerson(data);
                });
            }
        }
        PersonService.prototype.getAll = function () {
            return undefined;
        };
        PersonService.prototype.getPerson = function () {
            return this.person;
        };
        PersonService.prototype.setPerson = function (person) {
            this.person = person;
        };
        PersonService.prototype.updatePerson = function (person) {
            // data.contactInformation = "yolo";
            //  that.persons.one(that.username).customPUT(data);
            //that.dataService.postItem("PUT", "http://localhost:9900/api/persons/" + that.username, data, "application/json");
            return this.persons.one(person.username).customPUT(person);
        };
        PersonService.prototype.savePerson = function (person) {
            return undefined;
        };
        PersonService.prototype.deletePerson = function (username) {
            return undefined;
        };
        PersonService.prototype.getPersonByUsername = function (username) {
            return this.personRestService.all('persons').one(username).get();
        };
        PersonService.prototype.getPersonByLink = function (href) {
            return this.personRestService.oneUrl('persons', href).get();
        };
        PersonService.$inject = ["PersonRestangular", "$location", "authService"];
        return PersonService;
    })();
    oraj360.PersonService = PersonService;
    angular.module("oraj360").service("PersonService", PersonService);
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=person.service.js.map