/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../services/skills.service.ts"/>

module oraj360{

    export class Skill{
        name:string;
        skillCategory:any;

    }

    export class SkillController{


        static $inject = ["SkillService"];

        constructor(private skillCompService:ISkillsService,public skill:Skill,public skills:restangular.ICollectionPromise<{}>){
            var that = this;
            this.skill = new Skill();
           this.skills =   skillCompService.skillsList;


        }

        save():void{
            console.log(this.skill);
            /* this.skillCompService.addSkill(this.skill).then(function(result){
             console.log("added successfully!");
             });*/

        }



    }
    angular.module("oraj360")
        .controller("SkillController", SkillController);

}