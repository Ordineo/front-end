import {JWORKS360_GATEWAY} from "../GatewayModule";
import IWindowService = angular.IWindowService;

export class GatewayApiService{

  static SERVICE_NAME:string = "GatewayApiService";

  static $inject:Array<string> = ['$window'];

  /**
   * protocol with slashes
   * example: "http://"
   */
  private protocol:string;
  public host:string = 'gateway-oraj360.cfapps.io';

  public PERSONS_API:string = "/persons-oraj360/api/";
  public OBJECTIVES_API:string = "/objectives-oraj360/api/";
  public TIMELINES_API:string = "/timeline-oraj360/api/";

  constructor(private $window:IWindowService){
    this.protocol = $window.location.protocol + "//";
  }

  private buildApiUrl(servicePath:string):string{
    return this.protocol + this.host + servicePath;
  }

  public getObjectivesApi():string{
    return this.buildApiUrl(this.OBJECTIVES_API);
  }

  public getPersonsApi():string{
    return this.buildApiUrl(this.PERSONS_API);
  }

  public getTimelineApi():string{
    return this.buildApiUrl(this.TIMELINES_API);
  }

  public getTimeLineSampleUrl():string{
    return this.getTimelineApi() + 'timelines/person/gide';
  }
}
