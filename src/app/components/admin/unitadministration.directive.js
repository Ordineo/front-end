/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-route.d.ts" />
var oraj360;
(function (oraj360) {
    var UnitAdministration = (function () {
        function UnitAdministration() {
            this.restrict = "AE";
            this.templateUrl = "app/persons/unitadministration.html";
        }
        UnitAdministration.instance = function () {
            return new UnitAdministration();
        };
        UnitAdministration.prototype.link = function ($scope, elm, attr, ngModel) {
        };
        return UnitAdministration;
    })();
    angular.module("oraj360").directive("orajUnitAdministration", UnitAdministration.instance);
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=unitadministration.directive.js.map