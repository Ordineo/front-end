/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../services/auth.service.ts"/>
/// <reference path="../skills/skillCompetence.Controller.ts"/>
var oraj360;
(function (oraj360) {
    var SkillCompetenceService = (function () {
        function SkillCompetenceService(restCompetenceService, skills, username, skillCompetences) {
            this.restCompetenceService = restCompetenceService;
            this.skills = skills;
            this.username = username;
            this.skillCompetences = skillCompetences;
            this.username = window.sessionStorage.getItem("username");
            this.skills = restCompetenceService.all('skillCompetences');
            skillCompetences = this.skills.getList();
            console.log(skillCompetences);
        }
        SkillCompetenceService.prototype.getSkillCompetenceByPerson = function () {
            return this.skills.one('search').getList('findSkillCompetenceByPerson', { 'username': this.username });
        };
        SkillCompetenceService.prototype.removeSkillCompetence = function (skillComp) {
            return this.skills.one(skillComp).remove();
        };
        SkillCompetenceService.prototype.addSkillCompetence = function (skillComp) {
            return this.skills.post(skillComp);
        };
        SkillCompetenceService.$inject = ["SkillCompetenceRestangular"];
        return SkillCompetenceService;
    })();
    oraj360.SkillCompetenceService = SkillCompetenceService;
    angular.module("oraj360").service("SkillCompetenceService", SkillCompetenceService);
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=skillCompetence.service.js.map