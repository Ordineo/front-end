/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-route.d.ts" />
module oraj360 {


    export interface IContactCard extends ng.IAttributes {
        orajContactCard:string;
    }

    class ContactCard implements ng.IDirective {

        restrict = "AE";
        templateUrl = "app/persons/contactcard.html";
        controller = "PersonController";
        controllerAs = "profile";


        static instance():ng.IDirective {
            return new ContactCard();
        }

        link($scope, elm:Element, attr:IContactCard, ngModel:ng.INgModelController):void {

        }

    }
    angular.module("oraj360").directive("orajContactCard", ContactCard.instance);

}
