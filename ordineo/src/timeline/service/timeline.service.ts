import {TimeLine} from "../model/timeline.model";
import {IAuthService} from "../../auth/service/auth.service";
import IHttpService = angular.IHttpService;
import IRequestConfig = angular.IRequestConfig;
import {TimeLineJSONParser} from "./timeline.service.jsonparser";
import IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg;
import IHttpPromiseCallback = angular.IHttpPromiseCallback;
import IPromise = angular.IPromise;
import IDeferred = angular.IDeferred;
import IQService = angular.IQService;
import {GatewayApiService} from "../../gateway/service/GatewayApiService";

export class TimeLineService{

  static NAME = 'ordineo.TimeLineService';
  static $inject:Array<string> = [
    '$q',
    '$http',
    GatewayApiService.SERVICE_NAME,
    TimeLineJSONParser.NAME];

  constructor(
    private $q:IQService,
    private $http:IHttpService,
    private gateway:GatewayApiService,
    private parser:TimeLineJSONParser){
  }

  public getMock():IPromise<TimeLine> {
    var deferred:IDeferred<TimeLine> = this.$q.defer();
    setTimeout(()=> {
      var data = require('../../../test/mockdata/timeline.json');
      if (data !== null) {
        deferred.resolve(this.parser.parse(data));
      } else {
        deferred.reject("No data");
      }
    }, 3000);

    return deferred.promise;
  }

  /*
  * Unlike getMock data doesnt get parsed yet,
  * so inject TimeLineJSONParser inside a controller and parse it there*/
  public getTimelineByUserName(name:string):IPromise<any> {
    var requestConfig:IRequestConfig = {
      method: 'GET',
      url: this.gateway.getTimeLineSampleUrl()
    };

    return this
      .$http(requestConfig);
  }
}
