/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-route.d.ts" />
module oraj360 {

    export interface ICompetenceHub extends ng.IAttributes {
        orajCompetenceHub:string;
    }

    class CompetenceHub implements ng.IDirective {

        restrict = "AE";
        templateUrl = "app/skills/skillCompetences.html";
        controller = "SkillCompetenceController";
        controllerAs = "competence";


        static instance():ng.IDirective {
            return new CompetenceHub();
        }

        link($scope, elm:Element, attr:ICompetenceHub, ngModel:ng.INgModelController):void {

        }

    }
    angular.module("oraj360").directive("orajCompetencesHub", CompetenceHub.instance);

}

