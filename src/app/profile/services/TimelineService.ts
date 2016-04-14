import IPromise = angular.IPromise;
import IHttpService = angular.IHttpService;
import IQService = angular.IQService;
var mock:any = require('./mocktimelinedata.json');

export class TimelineService {

  static NAME:string = "TimelineService";
  static $inject = ['$http', '$q'];

  constructor(private httpService:IHttpService, private qService:IQService){
  }

  public getTimelineByUsername(username:string):IPromise<any>{
    var deffered = this.qService.defer();

    deffered.resolve(
      mock
    );

    return deffered.promise;
  }
}
