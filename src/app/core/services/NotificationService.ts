import IPromise = angular.IPromise;
import IHttpService = angular.IHttpService;
import {GatewayApiService} from "../../gateway/service/GatewayApiService";

export class NotificationService {
  static NAME: string = "NotificationService";

  static $inject: Array<string> = [
    "$http"
  ];

  constructor(private $http: IHttpService) {

  }

  public getNotifications(): IPromise<any> {
    return this.$http.get(GatewayApiService.getNotificationApi() + "messages");
  }
}
