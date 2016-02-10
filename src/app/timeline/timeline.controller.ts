/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/restangular/restangular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />

/// <reference path="../services/timeline.service.ts"/>
/// <reference path="../services/objective.service.ts"/>


module oraj360{


    export class TimelineController {


        objectives = [];

        static $inject = ["TimelineService","ObjectiveService"];

        constructor(private timelineService: ITimelineService,private objectiveService:IObjectiveService,public objective:Objective,public format:any,public objectiveLengths,public objectiveTypes){
            var that = this;
            this.objective = new Objective();
            this.objectiveLengths = [{name:"LongTerm"},{name:"ShortTerm"}];
            this.objectiveTypes = [{name:"Competence"}, {name:"BusinessUnit"}, {name:"Personal"}];

            this.getTimeline();



        }
        getTimeline():void{
            var that = this;
            this.timelineService.getTimeline().then(function(data){
                data.forEach(function(objective){
                    that.objectives.push(objective)
                })
            })

        }

        saveObjective():void{
            var that = this;
            var dateTar = new Date(this.format.targetDate);

            this.objective.targetDate = [dateTar.getFullYear(), dateTar.getMonth()+1,dateTar.getDate()];

            this.objectiveService.save(this.objective).then(function(data){
                that.objectives = [];
                that.getTimeline();
            });

        }



    }

    angular.module("oraj360")
        .controller("TimelineController",TimelineController);
}