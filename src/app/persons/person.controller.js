/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
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
        function PersonController(personService, $location, $scope, $timeout, $mdSidenav) {
            this.$location = $location;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$mdSidenav = $mdSidenav;
            this.username = window.sessionStorage.getItem("username");
            this.example = 'http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png';
            this.persons = [];
            this.selections = [
                { name: "Users" },
                { name: "BusinessUnitManagers" },
                { name: "CompetenceLeaders" },
                { name: "PracticeManagers" },
                { name: "Coaches" }
            ];
            this.toggleRight = this.buildToggler('right');
            this.isOpenRight = function () {
                return this.$mdSidenav('right').isOpen();
            };
            this.personService = personService;
            var that = this;
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
        PersonController.$inject = ["PersonService", "$location", "$scope", "$timeout", "$mdSidenav"];
        return PersonController;
    })();
    oraj360.PersonController = PersonController;
    angular.module("oraj360").controller("PersonController", PersonController);
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=person.controller.js.map