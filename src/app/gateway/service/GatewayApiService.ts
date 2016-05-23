import IWindowService = angular.IWindowService;

export class GatewayApiService {
  static SERVICE_NAME: string = "GatewayApiService";
  static $inject: Array<string> = ["$window"];

  private static protocol: string = "https://";
  private static host: string = "gateway-ordineo.cfapps.io";

  private static SOCIAL_API: string = "/social-ordineo/";
  private static IMAGE_API: string = "https://image-ordineo.cfapps.io/api/";
  private static EMPLOYEES_API: string = "/employee-ordineo/api/";
  private static MILESTONES_API: string = "/milestone-ordineo/api/";
  private static AUTH_API: string = "/auth/";
  private static NOTIFICATION_API: string = "/notification-ordineo/api/";


  constructor(private $window: IWindowService) {
  }

  private static buildApiUrl(servicePath: string): string {
    return this.protocol + this.host + servicePath;
  }

  public static getLinkedInApi(): string {
    return this.buildApiUrl(this.SOCIAL_API) + "api/linkedin";
  }

  public static getLinkedInAuthUrl(): string {
    return this.buildApiUrl(this.SOCIAL_API) + "connect/linkedin";
  }

  public static getImagesEmployeeApi(): string {
    return this.IMAGE_API + "images/";
  }

  public static getEmployeesApi(): string {
    return this.buildApiUrl(this.EMPLOYEES_API);
  }

  public static getSearchEmployeeApi(): string {
    return this.getEmployeesApi() + "employees/search/";
  }

  public static getMilestonesApi(): string {
    return this.buildApiUrl(this.MILESTONES_API);
  }

  public static getCreateMilestonesApi(): string {
    return this.getMilestonesApi() + "milestones/";
  }

  public static getAuthApi(): string {
    return this.buildApiUrl(this.AUTH_API);
  }

  public static getNotificationApi(): string {
    return this.buildApiUrl(this.NOTIFICATION_API);
  }
}
