/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../services/auth.service.ts"/>
/// <reference path="../authentication/auth.controller.ts"/>
/// <reference path="../persons/person.controller.ts"/>
var oraj360;
(function (oraj360) {
    var HeaderController = (function () {
        function HeaderController(authentication, personService, $timeout, $rootScope, $location, myDetails, username, loggedIn) {
            this.authentication = authentication;
            this.personService = personService;
            this.$timeout = $timeout;
            this.$rootScope = $rootScope;
            this.$location = $location;
            this.myDetails = myDetails;
            this.username = username;
            this.loggedIn = loggedIn;
            console.log('HeaderController');
            var that = this;
            username = window.sessionStorage.getItem("username");
            this.personService.getPersonByUsername(username).then(function (data) {
                that.setMyDetails(data);
            });
        }
        HeaderController.prototype.setMyDetails = function (person) {
            this.myDetails = person;
        };
        HeaderController.prototype.logout = function () {
            window.sessionStorage.clear();
            window.location.reload();
        };
        HeaderController.$inject = ["authService", "PersonService", "$timeout", "$rootScope", "$location"];
        return HeaderController;
    })();
    oraj360.HeaderController = HeaderController;
    angular.module("oraj360").controller("HeaderController", HeaderController);
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=header.controller.js.map