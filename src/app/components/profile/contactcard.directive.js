/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-route.d.ts" />
var oraj360;
(function (oraj360) {
    var ContactCard = (function () {
        function ContactCard() {
            this.restrict = "AE";
            this.templateUrl = "app/persons/contactcard.html";
            this.controller = "PersonController";
            this.controllerAs = "profile";
        }
        ContactCard.instance = function () {
            return new ContactCard();
        };
        ContactCard.prototype.link = function ($scope, elm, attr, ngModel) {
        };
        return ContactCard;
    })();
    angular.module("oraj360").directive("orajContactCard", ContactCard.instance);
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=contactcard.directive.js.map