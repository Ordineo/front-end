
import {GatewayApi} from "../GatewayApi";
import {JWORKS360_GATEWAY} from "../GatewayModule";
import IWindowService = angular.IWindowService;

export class GatewayApiService{

  static SERVICE_NAME:string = "GatewayApiService";

  static $inject:Array<string> = ['$window'];

  public PERSONS_API:string = "gateway-oraj360.cfapps.io/persons-oraj360/api/";
  public OBJECTIVES_API:string = "'gateway-oraj360.cfapps.io/objectives-oraj360/api/'";

  /**
   * protocol with slashes
   * example: "http://"
   */
  private protocol:string;

  constructor(private $window:IWindowService){
    this.protocol = $window.location.protocol + "//";
  }

  public getObjectivesApi():string{
    return this.protocol + this.OBJECTIVES_API;
  }

  public getPersonsApi():string{
    return this.protocol + this.PERSONS_API;
  }
}
