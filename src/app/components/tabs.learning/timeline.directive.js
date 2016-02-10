/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-route.d.ts" />
var oraj360;
(function (oraj360) {
    var Timeline = (function () {
        function Timeline() {
            this.restrict = "AE";
            this.templateUrl = "app/timeline/learning.html";
            this.controller = "TimelineController";
            this.controllerAs = "timeline";
        }
        Timeline.instance = function () {
            return new Timeline();
        };
        Timeline.prototype.link = function ($scope, elm, attr, ngModel) {
        };
        return Timeline;
    })();
    angular.module("oraj360").directive("orajTimeline", Timeline.instance);
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=timeline.directive.js.map