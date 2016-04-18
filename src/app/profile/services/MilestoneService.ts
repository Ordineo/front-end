import IPromise = angular.IPromise;
import IHttpService = angular.IHttpService;
import IQService = angular.IQService;
import {GatewayApiService} from "../../gateway/service/GatewayApiService";
import {TraversonHalService} from "../../traverson/service/TraversonHalService";

export class MilestoneService {

  static NAME:string = "MilestoneService";
  static $inject:Array<string> = [
    TraversonHalService.SERVICE_NAME,
    GatewayApiService.SERVICE_NAME,
    '$q',
    '$http'];

  constructor(private traverson:TraversonHalService,
              private gateway:GatewayApiService,
              private $q:IQService,
              private $http:IHttpService){
  }

  public getMilestonesByUsername(userName:string):IPromise<any> {
    return this.traverson.hal()
      .from(this.gateway.getMilestonesApi())
      .jsonHal()
      .follow('findByUsername','milestones[$all]')
      .withTemplateParameters({username: userName})
      .getResource()
      .result;
  }
}
