import IWindowService = angular.IWindowService;

export class GatewayApiService{

  static SERVICE_NAME:string = "GatewayApiService";

  static $inject:Array<string> = ['$window'];

  /**
   * protocol with slashes
   * example: "http://"
   */
  private protocol:string;
  public host:string = 'gateway-ordineo.cfapps.io';

  public EMPLOYEE_API:string = "/employee-ordineo/api/";
  public PERSONS_API:string = "/persons-oraj360/api/";
  public OBJECTIVES_API:string = "/objectives-oraj360/api/";
  public TIMELINES_API:string = "/timeline-oraj360/api/";
  public SOCIAL_API:string = "/social-ordineo/api/";

  constructor(private $window:IWindowService){
    this.protocol =  "https://";
  }

  private buildApiUrl(servicePath:string):string{
    return this.protocol + this.host + servicePath;
  }


  public getLinkedInApi():string{
    return this.protocol + 'social-ordineo.cfapps.io/api/linkedin';
  }

  public getLinkedInAuthUrl():string{
    return this.protocol + 'social-ordineo.cfapps.io/connect/linkedin';
  }

  public getSearchEmployeeApi():string{
    return this.getEmployeesApi() + 'employees/search/';
  }
  
  public getEmployeesApi():string{
    return this.buildApiUrl(this.EMPLOYEE_API);
  }
}
