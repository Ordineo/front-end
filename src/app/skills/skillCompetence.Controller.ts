/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../services/skillCompetence.service.ts"/>
/// <reference path="../services/skills.service.ts"/>

module oraj360{

    export class SkillCompetence{
        skill:any;
        person:string;
        competenceLevel:number;
    }

    export class SkillCompetenceController{

        static $inject = ["SkillCompetenceService","SkillsService","$window"];

        constructor(private skillCompService:ISkillCompetenceService,private skillsService:ISkillsService,private $window:ng.IWindowService,public skillCompetence:SkillCompetence,public username:string,public skills:any,public skillCompetences:any,public skillset:any){
            var that = this;
            this.skillCompetence = new SkillCompetence();
            username = window.sessionStorage.getItem("username");
            this.skillCompetence.person = username;
            skillsService.getSkills().then(function(data){
                that.skills = data;
            });
           this.initCompetences();

        }
        splitLink(href):any {
        var parts = [];
        parts = href.split("/", 6);
        return parts[5];
    }
        initCompetences():void{
            var that = this;
            this.skillCompService.getSkillCompetenceByPerson().then(function(data){
                that.skillCompetences = data;
            });
        }

        save():void{
            var that = this;
           this.skillCompService.addSkillCompetence(this.skillCompetence).then(function(result){
                console.log("added successfully!");
               that.initCompetences();
            });
        }

        remove(skillCompetence):void{
            var that = this;
            var split = this.splitLink(skillCompetence._links.self.href);
            this.skillCompService.removeSkillCompetence(split).then(function(result){
                console.log("removed successfully!");
                that.initCompetences();
            })

        }
    }
    angular.module("oraj360")
        .controller("SkillCompetenceController", SkillCompetenceController);
}