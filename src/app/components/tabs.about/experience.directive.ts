/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-route.d.ts" />
module oraj360 {


    export interface IExperience extends ng.IAttributes {
        orajExperiences:string;
    }

    class Experience implements ng.IDirective {

        restrict = "AE";
        templateUrl = "app/persons/experience.html";

        static instance():ng.IDirective {
            return new Experience();
        }

        link($scope, elm:Element, attr:IExperience, ngModel:ng.INgModelController):void {

        }

    }
    angular.module("oraj360").directive("orajExperiences", Experience.instance);

}
