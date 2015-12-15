/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
var oraj360;
(function (oraj360) {
    var MenuHeader = (function () {
        function MenuHeader() {
            this.restrict = "AE";
            this.templateUrl = "app/persons/header.html";
            this.controller = "HeaderController";
            this.controllerAs = "auth";
        }
        MenuHeader.instance = function () {
            return new MenuHeader();
        };
        MenuHeader.prototype.link = function ($scope, elm, attr, ngModel) {
        };
        return MenuHeader;
    })();
    angular.module("oraj360").directive("ngHeader", MenuHeader.instance);
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=menuHeader.directive.js.map