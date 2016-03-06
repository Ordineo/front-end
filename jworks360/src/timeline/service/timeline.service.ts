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
import {GatewayApi} from "../../config/GatewayApi";

export class TimeLineService{

  static NAME = 'jworks360.TimeLineService';
  static $inject:Array<string> = ['$q','$http', TimeLineJSONParser.NAME];

  constructor(private $q:IQService, private $http:IHttpService, private parser:TimeLineJSONParser){
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
    }, 1000);

    return deferred.promise;
  }

  /*
  * Unlike getMock data doesnt get parsed yet,
  * so inject TimeLineJSONParser inside a controller and parse it there*/
  public getTimelineByUserName(name:string):IPromise<any> {
    var requestConfig:IRequestConfig = {
      method: 'GET',
      url: GatewayApi.buildTimeLineUriByName('gide')
    };

    return this
      .$http(requestConfig);
  }
}
