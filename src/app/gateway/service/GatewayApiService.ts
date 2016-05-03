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

  public EMPLOYEES_API:string = "/api/employees/";
  public SOCIAL_API:string = "/social-ordineo/api/";
  public MILESTONES_API:string = "/api/milestones/";
  public AUTH_API:string = "/auth/";


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
    return this.getEmployeesApi() + 'search/';
  }

  public getEmployeesApi():string{
    return this.buildApiUrl(this.EMPLOYEES_API);
  }

  public getMilestonesApi():string {
    return this.buildApiUrl(this.MILESTONES_API);
  }

  public getCreateMilestonesApi():string {
    return this.getMilestonesApi() + 'milestones/';
  }

  public getAuthApi():string {
    return this.buildApiUrl(this.AUTH_API);
  }
}
