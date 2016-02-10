/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/angular-material/angular-material.d.ts" />
/// <reference path="../services/person.service.ts"/>
var oraj360;
(function (oraj360) {
    var Person = (function () {
        function Person() {
            this.users = [];
        }
        return Person;
    })();
    oraj360.Person = Person;
    var updatedPerson = (function () {
        function updatedPerson() {
        }
        return updatedPerson;
    })();
    oraj360.updatedPerson = updatedPerson;
    var PersonController = (function () {
        function PersonController(personService, $timeout, $mdSidenav, myDetails, updatedPerson, username, toggleRight) {
            this.personService = personService;
            this.$timeout = $timeout;
            this.$mdSidenav = $mdSidenav;
            this.myDetails = myDetails;
            this.updatedPerson = updatedPerson;
            this.username = username;
            this.toggleRight = toggleRight;
            this.persons = [];
            this.experiences = [
                {
                    "startDate": "2015-08-01",
                    "endDate": null,
                    "project": "CRS medewerker",
                    "function": ".NET Software Engineer",
                    "customer": {
                        "name": "Digipolis",
                        "img": "http://www.internetarchitects.be/wp-content/uploads/2014/10/digipolis.png"
                    }
                },
                {
                    "startDate": "2014-11-01",
                    "endDate": "2015-08-01",
                    "project": "Digitale handtekencomponent",
                    "function": ".NET Software Engineer",
                    "customer": {
                        "name": "Digipolis",
                        "img": "http://www.internetarchitects.be/wp-content/uploads/2014/10/digipolis.png"
                    }
                },
                {
                    "startDate": "2014-02-01",
                    "endDate": "2014-11-01",
                    "project": "Handtekenmap",
                    "function": ".NET Software Engineer",
                    "customer": {
                        "name": "Digipolis",
                        "img": "http://www.internetarchitects.be/wp-content/uploads/2014/10/digipolis.png"
                    }
                },
                {
                    "startDate": "2013-05-01",
                    "endDate": "2014-02-01",
                    "project": "Markten en foren",
                    "function": ".NET Software Engineer",
                    "customer": {
                        "name": "Digipolis",
                        "img": "http://www.internetarchitects.be/wp-content/uploads/2014/10/digipolis.png"
                    }
                },
                {
                    "startDate": "2012-08-01",
                    "endDate": "2013-05-01",
                    "project": "Brondata groen",
                    "function": ".NET Software Engineer",
                    "customer": {
                        "name": "Digipolis",
                        "img": "http://www.internetarchitects.be/wp-content/uploads/2014/10/digipolis.png"
                    }
                }
            ];
            this.selections = [
                { name: "Users" },
                { name: "BusinessUnitManagers" },
                { name: "CompetenceLeaders" },
                { name: "PracticeManagers" },
                { name: "Coaches" }
            ];
            console.log('PersonController');
            var that = this;
            this.username = window.sessionStorage.getItem("username");
            this.toggleRight = this.buildToggler('right');
            $timeout(function () {
                that.myDetails = that.personService.getPerson();
            }, 500);
        }
        PersonController.prototype.changeView = function (selected) {
            var thos = this;
            var list = eval("this.myDetails._links." + selected);
            thos.persons = [];
            if (list !== undefined) {
                if (list.href === undefined) {
                    list.forEach((function (data) {
                        thos.personService.getPersonByLink(data.href).then(function (person) {
                            thos.persons.push(person);
                        });
                    }));
                }
                else {
                    thos.personService.getPersonByLink(list.href).then(function (data) {
                        thos.persons.push(data);
                    });
                }
            }
        };
        PersonController.prototype.updatePerson = function () {
            if (this.updatedPerson.firstName.length > 0) {
                this.myDetails.firstName = this.updatedPerson.firstName;
            }
            if (this.updatedPerson.lastName.length > 0) {
                this.myDetails.lastName = this.updatedPerson.lastName;
            }
            if (this.updatedPerson.contactInformation.length > 0) {
                this.myDetails.contactInformation = this.updatedPerson.contactInformation;
            }
            this.personService.updatePerson(this.myDetails).then(function (data) {
                console.log("success!");
            });
        };
        PersonController.prototype.buildToggler = function (navID) {
            return function () {
                this.$mdSidenav(navID).toggle().then(function () {
                });
            };
        };
        PersonController.$inject = ["PersonService", "$timeout", "$mdSidenav"];
        return PersonController;
    })();
    oraj360.PersonController = PersonController;
    angular.module("oraj360").controller("PersonController", PersonController);
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=person.controller.js.map