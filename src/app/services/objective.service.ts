/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../services/timeline.service.ts"/>

module oraj360{


    export class Objective {
        description:string;
        targetDate:any;
        type:any;
        length:any;
        username:string;
    }


    export interface IObjectiveService{
       save(objective:Objective):angular.IPromise<{}>;


    }

    export class ObjectiveService implements  IObjectiveService{

        static $inject = ["ObjectiveRestangular"];

        constructor(private ObjectiveRestangular:any, public username:string,public objectives:any){
            this.username =window.sessionStorage.getItem("username");

            this.objectives= ObjectiveRestangular.all('objectives');



        }


        save(objective:Objective):angular.IPromise<{}>{

                objective.username = this.username;
           return this.objectives.post(objective)

        }

    }

    angular.module("oraj360")
        .service("ObjectiveService",ObjectiveService);

    angular.module('oraj360')
        .factory('ObjectiveRestangular', function (Restangular) {
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
