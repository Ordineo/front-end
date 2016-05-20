import {GatewayApiService} from "../../gateway/service/GatewayApiService";
import IRequestConfig = angular.IRequestConfig;
import IHttpService = angular.IHttpService;
import IPromise = angular.IPromise;
export class LinkedInService {
  static SERVICE_NAME: string = "ordineo.social.linkedin";

  static $inject: Array<string> = ["$http"];

  private httpConfig: IRequestConfig;

  constructor(private $http: IHttpService) {
    this.httpConfig = {
      method: "GET",
      url: GatewayApiService.getLinkedInApi(),
      withCredentials: true
    };
  }

  public requestSync(username: string): IPromise<any> {
    this.httpConfig.params = {
      username: username
    };

    return this.$http(this.httpConfig);
  }
}
