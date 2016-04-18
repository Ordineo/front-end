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

  public EMPLOYEES_API:string = "/employee-ordineo/api/";
  public PERSONS_API:string = "/persons-oraj360/api/";
  public OBJECTIVES_API:string = "/objectives-oraj360/api/";
  public SOCIAL_API:string = "/social-ordineo/api/";
  public MILESTONES_API:string = "/milestone-ordineo/api/";


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

  static getImagesEmployeeApi():string{
    return 'https://image-ordineo.cfapps.io/api/images/';
  }

  public getSearchEmployeeApi():string{
    return this.getEmployeesApi() + 'employees/search/';
  }

  public getEmployeesApi():string{
    return this.buildApiUrl(this.EMPLOYEES_API);
  }

  public getMilestonesApi():string {
    return this.buildApiUrl(this.MILESTONES_API) + 'milestones/search/';
  }

  public getCreateMilestonesApi():string {
    return 'https://gateway-ordineo.cfapps.io/milestone-ordineo/api/milestones';
  }
}
