import IPromise = angular.IPromise;
import IHttpService = angular.IHttpService;
import IQService = angular.IQService;
import {GatewayApiService} from "../../gateway/service/GatewayApiService";
import {TraversonHalService} from "../../traverson/service/TraversonHalService";
var mock:any = require('./mocktimelinedata.json');

export class TimelineService {

  static NAME:string = "TimelineService";
  static $inject = ['$http', '$q'];

  constructor(private $http:IHttpService, private qService:IQService, private gateway:GatewayApiService, private traverson:TraversonHalService){
  }

  public getTimelineByUsername(username:string):IPromise<any>{
    var deffered = this.qService.defer();

    deffered.resolve(
      mock
    );

    return deffered.promise;
  }

  public createMilestoneByUsername(username:string, createDate:string, dueDate:string, endDate:string,
                                   moreInformation:string, objective:string):IPromise<any> { 
    return this.$http.post(this.gateway.getCreateMilestonesApi(), {
      username: username,
      createDate: createDate,
      dueDate: dueDate,
      endDate: endDate,
      moreInformation: moreInformation,
      objective: objective
    });

    /*return this.traverson.hal()
      .from(this.gateway.getCreateMilestonesApi())
      .follow('employee','self')
      .withRequestOptions({
        headers: {
          'Content-type':'application/json'
        }
      })
      .post({
        username: username,
        createDate: createDate,
        dueDate: dueDate,
        endDate: endDate,
        moreInformation: moreInformation,
        objective: objective
      })
      .result;*/
  }
}
