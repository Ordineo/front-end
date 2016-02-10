/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-route.d.ts" />
module oraj360 {


    export interface IUnitAdministration extends ng.IAttributes {
        orajUnitAdministration:string;
    }

    class UnitAdministration implements ng.IDirective {

        restrict = "AE";
        templateUrl = "app/persons/unitadministration.html";


        static instance():ng.IDirective {
            return new UnitAdministration();
        }

        link($scope, elm:Element, attr:IUnitAdministration, ngModel:ng.INgModelController):void {

        }

    }
    angular.module("oraj360").directive("orajUnitAdministration", UnitAdministration.instance);

}
