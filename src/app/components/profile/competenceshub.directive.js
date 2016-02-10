/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-route.d.ts" />
var oraj360;
(function (oraj360) {
    var CompetenceHub = (function () {
        function CompetenceHub() {
            this.restrict = "AE";
            this.templateUrl = "app/skills/skillCompetences.html";
            this.controller = "SkillCompetenceController";
            this.controllerAs = "competence";
        }
        CompetenceHub.instance = function () {
            return new CompetenceHub();
        };
        CompetenceHub.prototype.link = function ($scope, elm, attr, ngModel) {
        };
        return CompetenceHub;
    })();
    angular.module("oraj360").directive("orajCompetencesHub", CompetenceHub.instance);
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=competenceshub.directive.js.map