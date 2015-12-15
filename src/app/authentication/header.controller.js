/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../services/auth.service.ts"/>
/// <reference path="../authentication/auth.controller.ts"/>
/// <reference path="../persons/person.controller.ts"/>
var oraj360;
(function (oraj360) {
    var HeaderController = (function () {
        function HeaderController(authentication, personService, $timeout, $rootScope) {
            this.$timeout = $timeout;
            this.$rootScope = $rootScope;
            this.username = window.sessionStorage.getItem("username");
            this.personService = personService;
            this.authService = authentication;
            var that = this;
            if (this.authService.isAuthorized()) {
                this.loggedIn = true;
                $timeout(function () {
                    that.myDetails = that.personService.getPerson();
                }, 1000);
            }
            else {
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
        HeaderController.prototype.setMyDetails = function (person) {
            this.myDetails = person;
        };
        HeaderController.prototype.logout = function () {
            window.sessionStorage.clear();
            window.location.reload();
        };
        HeaderController.$inject = ["AuthService", "PersonService", "$timeout", "$rootScope"];
        return HeaderController;
    })();
    oraj360.HeaderController = HeaderController;
    angular.module("oraj360").controller("HeaderController", HeaderController);
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=header.controller.js.map