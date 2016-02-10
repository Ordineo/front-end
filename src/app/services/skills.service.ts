/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />

/// <reference path="../services/auth.service.ts"/>
/// <reference path="../skills/skills.controller.ts"/>


module oraj360{

    export interface ISkillsService{
        skillsList:restangular.ICollectionPromise<{}>;
        username:string;

        getSkills():ng.IPromise<{}>;
        getSkillByPerson():ng.IPromise<{}>;
        removeSkill():ng.IPromise<{}>;
        addSkill(skillComp:Skill):ng.IPromise<{}>

    }

    export class SkillService implements ISkillsService{

        static $inject = ["SkillRestangular"];

        constructor(private restService:restangular.IService, private skills:restangular.IElement,public username:string,public skillsList:restangular.ICollectionPromise<{}>){
    console.log("skillService");
            this.skills =restService.all('skills');
            console.log(skills);

        }

        getSkills():ng.IPromise<{}>{
            return this.skills.getList();
        }

        getSkillByPerson():ng.IPromise<{}>{

            // console.log(this.skills.one('search').getList('findSkillByPerson',{'username':this.username}));
            return null;

        }
        removeSkill():angular.IPromise<{}>{
            return null;
        }
        addSkill(skill:any):angular.IPromise<{}>{
            return this.skills.post(skill);
        }



    }
    angular.module("oraj360")
        .service("SkillsService",SkillService);

    angular.module('oraj360')
        .factory('SkillRestangular', function (Restangular) {
            return Restangular.withConfig(function (RestangularConfigurer) {

                RestangularConfigurer.setBaseUrl('http://localhost:9900/api/');

                RestangularConfigurer.setDefaultHeaders({'Content-Type': 'application/json'});
                RestangularConfigurer.setRestangularFields({
                    selfLink: 'self.link'
                });
                RestangularConfigurer.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
                    var extractedDataList = [];
                    var extractedData;
                    if (operation === "getList") {
                        if (Object.keys(data._embedded).length === 0 || data._embedded ===null) {
                            return extractedDataList;
                        } else {
                            if (extractedData == null) {
                                extractedData = data._embedded.skills;

                            }
                        }
                    } else {
                        extractedData = data;
                    }
                    return extractedData;
                })
            })
        });

    angular.module('oraj360').constant("urlCloud","http://");
    angular.module('oraj360')
        .factory('SkillCompetenceRestangular', function (Restangular) {
            return Restangular.withConfig(function (RestangularConfigurer) {

                RestangularConfigurer.setBaseUrl('http://localhost:9900/api/');

                RestangularConfigurer.setDefaultHeaders({'Content-Type': 'application/json'});
                RestangularConfigurer.setRestangularFields({
                    selfLink: 'self.link'
                });
                RestangularConfigurer.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
                    var extractedDataList = [];
                    var extractedData;
                    if (operation === "getList") {
                        if (data._embedded ===null || data._embedded ===undefined ||Object.keys(data._embedded).length === 0) {
                            return extractedDataList;
                        } else {
                            if (extractedData == null) {
                                extractedData = data._embedded.skillCompetences;

                            }
                        }
                    } else {
                        extractedData = data;
                    }
                    return extractedData;
                })
            })
        });


}