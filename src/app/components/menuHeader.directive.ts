/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />


module oraj360 {

    export interface IMenuHeader extends ng.IAttributes {
        ngHeader:string;
    }

    class MenuHeader implements ng.IDirective {

        restrict = "AE";
        templateUrl = "app/persons/header.html";
        controller = "HeaderController";
        controllerAs = "auth";

        static instance():ng.IDirective {
            return new MenuHeader();
        }

        link($scope, elm:Element, attr:IMenuHeader, ngModel:ng.INgModelController):void {

        }

    }
    angular.module("oraj360").directive("ngHeader", MenuHeader.instance);

}

