/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />


module oraj360{

    export interface ITimelineService{
    username:string;
    getTimeline():restangular.ICollectionPromise<{}>;

    }

    export class TimelineService implements  ITimelineService{

        static $inject = ["TimelineRestangular"];

        constructor(private TimelineRestangular:any, public username:string,public timelines:any){
            this.username =window.sessionStorage.getItem("username");
             this.timelines = TimelineRestangular.all('timelines')


        }


        getTimeline(){
            return this.timelines.one("person").one(this.username).getList();
        }

    }

    angular.module("oraj360")
        .service("TimelineService",TimelineService);


    angular.module('oraj360')
        .factory('TimelineRestangular', function (Restangular) {
            return Restangular.withConfig(function (RestangularConfigurer) {

                RestangularConfigurer.setBaseUrl('http://localhost:9900/api/');

                RestangularConfigurer.setDefaultHeaders({'Content-Type': 'application/json'});
                RestangularConfigurer.setRestangularFields({
                    selfLink: 'self.link'
                });
                RestangularConfigurer.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
                    var extractedDataList = [];
                    var extractedData;
                    if (operation === "getList") {
                        if (Object.keys(data._embedded).length === 0 || data._embedded ===null) {
                            return extractedDataList;
                        } else {
                            if (extractedData == null) {
                                extractedData = data._embedded.objectiveResources;

                            }
                        }
                    } else {
                        extractedData = data;
                    }
                    return extractedData;
                })
            })
        });
}















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


