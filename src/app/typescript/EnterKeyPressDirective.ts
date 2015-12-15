/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />

module oraj360 {

    export interface IEnterKeyPressAttributes extends ng.IAttributes {
        ngEnter:string;
    }

    class EnterKeyPressDirective implements ng.IDirective {

        require = "?ngModel";
        restrict = "A";

        static instance():ng.IDirective{
            return new EnterKeyPressDirective();
        }

        link($scope: ng.IScope, elm: Element, attr: IEnterKeyPressAttributes, ngModel: ng.INgModelController): void {

            var element = angular.element(elm);
            element.bind("keydown keypress",(event:JQueryEventObject) =>{

                if(event.which ===13){
                    $scope.$apply(()=>{
                        $scope.$eval(attr.ngEnter);
                    });
                    event.preventDefault();
                }
            })
        }


    }
    angular.module("oraj360")
    .directive("ngEnter",EnterKeyPressDirective.instance);
}