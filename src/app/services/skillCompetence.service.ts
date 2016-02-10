/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />

/// <reference path="../services/auth.service.ts"/>
/// <reference path="../skills/skillCompetence.Controller.ts"/>


module oraj360{

    export interface ISkillCompetenceService{
        skillCompetences:restangular.ICollectionPromise<{}>;
        username:string;

        getSkillCompetenceByPerson():ng.IPromise<{}>;
        removeSkillCompetence(skillComp:any):ng.IPromise<{}>;
        addSkillCompetence(skillComp:SkillCompetence):ng.IPromise<{}>

    }

    export class SkillCompetenceService implements ISkillCompetenceService{

        static $inject = ["SkillCompetenceRestangular"];

        constructor(private restCompetenceService:restangular.IService, private skills:restangular.IElement,public username:string,public skillCompetences:restangular.ICollectionPromise<{}>){

            this.username = window.sessionStorage.getItem("username");
            this.skills =restCompetenceService.all('skillCompetences');
            skillCompetences = this.skills.getList();
            console.log(skillCompetences);

        }

        getSkillCompetenceByPerson():ng.IPromise<{}>{

          return this.skills.one('search').getList('findSkillCompetenceByPerson',{'username':this.username});

    }
        removeSkillCompetence(skillComp:any):angular.IPromise<{}>{

            return this.skills.one(skillComp).remove();
        }
        addSkillCompetence(skillComp:any):angular.IPromise<{}>{
           return this.skills.post(skillComp);
        }



    }
    angular.module("oraj360")
        .service("SkillCompetenceService",SkillCompetenceService);

}