/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../services/skills.service.ts"/>
var oraj360;
(function (oraj360) {
    var Skill = (function () {
        function Skill() {
        }
        return Skill;
    })();
    oraj360.Skill = Skill;
    var SkillController = (function () {
        function SkillController(skillCompService, skill, skills) {
            this.skillCompService = skillCompService;
            this.skill = skill;
            this.skills = skills;
            var that = this;
            this.skill = new Skill();
            this.skills = skillCompService.skillsList;
        }
        SkillController.prototype.save = function () {
            console.log(this.skill);
            /* this.skillCompService.addSkill(this.skill).then(function(result){
             console.log("added successfully!");
             });*/
        };
        SkillController.$inject = ["SkillService"];
        return SkillController;
    })();
    oraj360.SkillController = SkillController;
    angular.module("oraj360").controller("SkillController", SkillController);
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=skills.controller.js.map