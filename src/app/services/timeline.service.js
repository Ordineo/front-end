/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
var oraj360;
(function (oraj360) {
    var TimelineService = (function () {
        function TimelineService(TimelineRestangular, username, timelines) {
            this.TimelineRestangular = TimelineRestangular;
            this.username = username;
            this.timelines = timelines;
            this.username = window.sessionStorage.getItem("username");
            this.timelines = TimelineRestangular.all('timelines');
        }
        TimelineService.prototype.getTimeline = function () {
            return this.timelines.one("person").one(this.username).getList();
        };
        TimelineService.$inject = ["TimelineRestangular"];
        return TimelineService;
    })();
    oraj360.TimelineService = TimelineService;
    angular.module("oraj360").service("TimelineService", TimelineService);
    angular.module('oraj360').factory('TimelineRestangular', function (Restangular) {
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
/*'use strict';

angular.module('oraj360')
    .factory('Timeline', ['dataservice', function (dataservice) {

        var id = window.sessionStorage.getItem("id");
        var myTimeline = [];

        dataservice.getItem('http://localhost:9900/api/timelines/person/' + id).success(function (data) {
            if (data._embedded.objectiveResources != null) {
                data._embedded.objectiveResources.forEach(function (event) {
                    myTimeline.push(event);
                })
            }
        });

        return {
            myTimeline: myTimeline
        };

    }]);
*/
//# sourceMappingURL=timeline.service.js.map