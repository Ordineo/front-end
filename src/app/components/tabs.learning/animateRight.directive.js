/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-route.d.ts" />
var oraj360;
(function (oraj360) {
    var Animate = (function () {
        function Animate() {
            this.restrict = "A";
        }
        Animate.instance = function () {
            return new Animate();
        };
        Animate.prototype.link = function ($scope, elm, attr, ngModel) {
            $scope.right = function () {
                $(this).animate({
                    left: '+=150'
                });
                elm.fadeOut("slow");
            };
            var direction = attr['jwAnimate'];
            elm.on('click', $scope[direction]);
        };
        return Animate;
    })();
    angular.module("oraj360").directive("jwAnimate", Animate.instance);
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=animateRight.directive.js.map