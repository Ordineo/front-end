/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../services/skillCompetence.service.ts"/>
/// <reference path="../services/skills.service.ts"/>
var oraj360;
(function (oraj360) {
    var SkillCompetence = (function () {
        function SkillCompetence() {
        }
        return SkillCompetence;
    })();
    oraj360.SkillCompetence = SkillCompetence;
    var SkillCompetenceController = (function () {
        function SkillCompetenceController(skillCompService, skillsService, $window, skillCompetence, username, skills, skillCompetences, skillset) {
            this.skillCompService = skillCompService;
            this.skillsService = skillsService;
            this.$window = $window;
            this.skillCompetence = skillCompetence;
            this.username = username;
            this.skills = skills;
            this.skillCompetences = skillCompetences;
            this.skillset = skillset;
            var that = this;
            this.skillCompetence = new SkillCompetence();
            username = window.sessionStorage.getItem("username");
            this.skillCompetence.person = username;
            skillsService.getSkills().then(function (data) {
                that.skills = data;
            });
            this.initCompetences();
        }
        SkillCompetenceController.prototype.splitLink = function (href) {
            var parts = [];
            parts = href.split("/", 6);
            return parts[5];
        };
        SkillCompetenceController.prototype.initCompetences = function () {
            var that = this;
            this.skillCompService.getSkillCompetenceByPerson().then(function (data) {
                that.skillCompetences = data;
            });
        };
        SkillCompetenceController.prototype.save = function () {
            var that = this;
            this.skillCompService.addSkillCompetence(this.skillCompetence).then(function (result) {
                console.log("added successfully!");
                that.initCompetences();
            });
        };
        SkillCompetenceController.prototype.remove = function (skillCompetence) {
            var that = this;
            var split = this.splitLink(skillCompetence._links.self.href);
            this.skillCompService.removeSkillCompetence(split).then(function (result) {
                console.log("removed successfully!");
                that.initCompetences();
            });
        };
        SkillCompetenceController.$inject = ["SkillCompetenceService", "SkillsService", "$window"];
        return SkillCompetenceController;
    })();
    oraj360.SkillCompetenceController = SkillCompetenceController;
    angular.module("oraj360").controller("SkillCompetenceController", SkillCompetenceController);
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=skillCompetence.Controller.js.map