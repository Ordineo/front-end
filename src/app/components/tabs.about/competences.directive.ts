/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-route.d.ts" />
module oraj360 {


    export interface ICompetence extends ng.IAttributes {
        orajCompetences:string;
    }

    class Competence implements ng.IDirective {

        restrict = "AE";
        templateUrl = "app/skills/competences.html";
        controller = "SkillCompetenceController";
        controllerAs = "skill";


        static instance():ng.IDirective {
            return new Competence();
        }

        link($scope, elm:Element, attr:ICompetence, ngModel:ng.INgModelController):void {

        }

    }
    angular.module("oraj360").directive("orajCompetences", Competence.instance);

}
