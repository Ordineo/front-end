/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-route.d.ts" />
var oraj360;
(function (oraj360) {
    var Experience = (function () {
        function Experience() {
            this.restrict = "AE";
            this.templateUrl = "app/persons/experience.html";
        }
        Experience.instance = function () {
            return new Experience();
        };
        Experience.prototype.link = function ($scope, elm, attr, ngModel) {
        };
        return Experience;
    })();
    angular.module("oraj360").directive("orajExperiences", Experience.instance);
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=experience.directive.js.map