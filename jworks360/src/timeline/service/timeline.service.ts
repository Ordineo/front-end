
import {TimeLine} from "../model/timeline.model";
import {IAuthService} from "../../auth/service/auth.service";
import IHttpService = angular.IHttpService;
import IRequestConfig = angular.IRequestConfig;
import {TimeLineObjective} from "../model/timeline.objective.model";

export interface ITimeLineService{
  getTimelineByUserName(name:string):TimeLine;
}
export class TimeLineService implements ITimeLineService{

  static NAME = 'jworks360.TimeLineService';

  static $inject:Array<string> = ['$http'];

  constructor(private $http:IHttpService){

  }

  getMock():TimeLine {
    var data = require('../../../test/mockdata/timeline.json');
    var timelineResources = data._embedded.timelineResources;
    var objectives:Array<TimeLineObjective> = [];
    for (var i = 0; i < timelineResources.length; i++){
      var objective = new TimeLineObjective();
      objective.description = timelineResources[i].description;
      objective.moreInformation = timelineResources[i].moreInformation;
      objective.reviewer = timelineResources[i].reviewer;
      objective.tags = timelineResources[i].tags;
      objective.date = timelineResources[i].date;
      objectives.push(objective);
    }
    return new TimeLine(objectives);
  }

  //TODO implement requests

  getTimelineByUserName(name:string):TimeLine {
    var requestConfig:IRequestConfig = {
      method: 'GET',
      url: 'http://timeline-oraj360.cfapps.io/api/timelines/person/' + name
    };

    this.$http(requestConfig).then(function success(response){
      console.log("SUCCESS");
      console.log(response.data);
    },function error(response){
      console.log("Failed");
    });

    return undefined;
  }

  private parseResponseData(data:any):void{
    this.parseObjectives(data._embedded.timelineResources);
  }

  private parseObjectives(data:any):void{
    console.log("Objectivess: " + data);
  }
}
