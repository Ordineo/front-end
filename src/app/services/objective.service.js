/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../services/timeline.service.ts"/>
var oraj360;
(function (oraj360) {
    var Objective = (function () {
        function Objective() {
        }
        return Objective;
    })();
    oraj360.Objective = Objective;
    var ObjectiveService = (function () {
        function ObjectiveService(ObjectiveRestangular, username, objectives) {
            this.ObjectiveRestangular = ObjectiveRestangular;
            this.username = username;
            this.objectives = objectives;
            this.username = window.sessionStorage.getItem("username");
            this.objectives = ObjectiveRestangular.all('objectives');
        }
        ObjectiveService.prototype.save = function (objective) {
            objective.username = this.username;
            return this.objectives.post(objective);
        };
        ObjectiveService.$inject = ["ObjectiveRestangular"];
        return ObjectiveService;
    })();
    oraj360.ObjectiveService = ObjectiveService;
    angular.module("oraj360").service("ObjectiveService", ObjectiveService);
    angular.module('oraj360').factory('ObjectiveRestangular', function (Restangular) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('http://localhost:9900/api/');
            RestangularConfigurer.setDefaultHeaders({ 'Content-Type': 'application/json' });
            RestangularConfigurer.setRestangularFields({
                selfLink: 'self.link'
            });
            RestangularConfigurer.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
                var extractedDataList = [];
                var extractedData;
                if (operation === "getList") {
                    if (Object.keys(data._embedded).length === 0 || data._embedded === null) {
                        return extractedDataList;
                    }
                    else {
                        if (extractedData == null) {
                            extractedData = data._embedded.objectiveResources;
                        }
                    }
                }
                else {
                    extractedData = data;
                }
                return extractedData;
            });
        });
    });
})(oraj360 || (oraj360 = {}));
//# sourceMappingURL=objective.service.js.map