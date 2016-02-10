/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-route.d.ts" />


module oraj360 {

    export interface ITimeline extends ng.IAttributes {
        orajTimeline:string;
    }

    class Timeline implements ng.IDirective {

        restrict = "AE";
        templateUrl = "app/timeline/learning.html";
        controller= "TimelineController";
        controllerAs = "timeline";


        static instance():ng.IDirective {
            return new Timeline();
        }

        link($scope, elm:Element, attr:ITimeline, ngModel:ng.INgModelController):void {

        }

    }
    angular.module("oraj360").directive("orajTimeline", Timeline.instance);

}

