/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-route.d.ts" />


module oraj360 {

    export interface IAnimate extends ng.IAttributes {
        jwAnimate:string;
    }

    class Animate implements ng.IDirective {

        restrict = "A";

        static instance():ng.IDirective {
            return new Animate();
        }

        link($scope, elm:ng.IRootElementService, attr:IAnimate, ngModel:ng.INgModelController):void {

            $scope.right = function(){
                $(this).animate({
                    left: '+=150'
                });
                 elm.fadeOut("slow");
            };
            var direction = attr['jwAnimate'];
            elm.on('click',$scope[direction]);

        }

    }
    angular.module("oraj360").directive("jwAnimate", Animate.instance);

}

