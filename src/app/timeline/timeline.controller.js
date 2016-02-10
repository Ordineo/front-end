/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../services/timeline.service.ts"/>
/// <reference path="../services/objective.service.ts"/>
var oraj360;
(function (oraj360) {
    var TimelineController = (function () {
        function TimelineController(timelineService, objectiveService, objective, format, objectiveLengths, objectiveTypes) {
            this.timelineService = timelineService;
            this.objectiveService = objectiveService;
            this.objective = objective;
            this.format = format;
            this.objectiveLengths = objectiveLengths;
            this.objectiveTypes = objectiveTypes;
            this.objectives = [];
            var that = this;
            this.objective = new oraj360.Objective();
            this.objectiveLengths = [{ name: "LongTerm" }, { name: "ShortTerm" }];
            this.objectiveTypes = [{ name: "Competence" }, { name: "BusinessUnit" }, { name: "Personal" }];
            this.getTimeline();
        }
        TimelineController.prototype.getTimeline = function () {
            var that = this;
            this.timelineService.getTimeline().then(function (data) {
                data.forEach(function (objective) {
                    that.objectives.push(objective);
                });
            });
        };
        TimelineController.prototype.saveObjective = function () {
            var that = this;
            var dateTar = new Date(this.format.targetDate);
            this.objective.targetDate = [dateTar.getFullYear(), dateTar.getMonth() + 1, dateTar.getDate()];
            this.objectiveService.save(this.objective).then(function (data) {
                that.objectives = [];
                that.getTimeline();
            });
        };
        TimelineController.$inject = ["TimelineService", "ObjectiveService"];
        return TimelineController;
    })();
    oraj360.TimelineController = TimelineController;
    angular.module("oraj360").controller("TimelineController", TimelineController);
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=timeline.controller.js.map