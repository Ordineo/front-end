/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../services/auth.service.ts"/>
/// <reference path="../skills/skills.controller.ts"/>
var oraj360;
(function (oraj360) {
    var SkillService = (function () {
        function SkillService(restService, skills, username, skillsList) {
            this.restService = restService;
            this.skills = skills;
            this.username = username;
            this.skillsList = skillsList;
            console.log("skillService");
            this.skills = restService.all('skills');
            console.log(skills);
        }
        SkillService.prototype.getSkills = function () {
            return this.skills.getList();
        };
        SkillService.prototype.getSkillByPerson = function () {
            // console.log(this.skills.one('search').getList('findSkillByPerson',{'username':this.username}));
            return null;
        };
        SkillService.prototype.removeSkill = function () {
            return null;
        };
        SkillService.prototype.addSkill = function (skill) {
            return this.skills.post(skill);
        };
        SkillService.$inject = ["SkillRestangular"];
        return SkillService;
    })();
    oraj360.SkillService = SkillService;
    angular.module("oraj360").service("SkillsService", SkillService);
    angular.module('oraj360').factory('SkillRestangular', function (Restangular) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('http://localhost:9900/api/');
            RestangularConfigurer.setDefaultHeaders({ 'Content-Type': 'application/json' });
            RestangularConfigurer.setRestangularFields({
                selfLink: 'self.link'
            });
            RestangularConfigurer.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
                var extractedDataList = [];
                var extractedData;
                if (operation === "getList") {
                    if (Object.keys(data._embedded).length === 0 || data._embedded === null) {
                        return extractedDataList;
                    }
                    else {
                        if (extractedData == null) {
                            extractedData = data._embedded.skills;
                        }
                    }
                }
                else {
                    extractedData = data;
                }
                return extractedData;
            });
        });
    });
    angular.module('oraj360').constant("urlCloud", "http://");
    angular.module('oraj360').factory('SkillCompetenceRestangular', function (Restangular) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('http://localhost:9900/api/');
            RestangularConfigurer.setDefaultHeaders({ 'Content-Type': 'application/json' });
            RestangularConfigurer.setRestangularFields({
                selfLink: 'self.link'
            });
            RestangularConfigurer.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
                var extractedDataList = [];
                var extractedData;
                if (operation === "getList") {
                    if (data._embedded === null || data._embedded === undefined || Object.keys(data._embedded).length === 0) {
                        return extractedDataList;
                    }
                    else {
                        if (extractedData == null) {
                            extractedData = data._embedded.skillCompetences;
                        }
                    }
                }
                else {
                    extractedData = data;
                }
                return extractedData;
            });
        });
    });
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=skills.service.js.map