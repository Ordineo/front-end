/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-route.d.ts" />
var oraj360;
(function (oraj360) {
    var Competence = (function () {
        function Competence() {
            this.restrict = "AE";
            this.templateUrl = "app/skills/competences.html";
            this.controller = "SkillCompetenceController";
            this.controllerAs = "skill";
        }
        Competence.instance = function () {
            return new Competence();
        };
        Competence.prototype.link = function ($scope, elm, attr, ngModel) {
        };
        return Competence;
    })();
    angular.module("oraj360").directive("orajCompetences", Competence.instance);
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=competences.directive.js.map