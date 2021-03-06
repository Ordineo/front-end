import {LinkedInService} from "../../social/linkedin/LinkedInService";
import {GatewayApiService} from "../../gateway/service/GatewayApiService";
import IRootScopeService = angular.IRootScopeService;
import ISCEService = angular.ISCEService;

export class LinkedInController {
  public linkedinIcon: any;
  public action: string;
  public username: string;

  static SESSION_ITEM: string = "fromAuth";
  static EVENT_AUTH: string = "goToAuth";
  static EVENT_SYNC_EMPLOYEE: string = "syncEmployeeData";

  static $inject: Array<string> = [
    "$sce",
    LinkedInService.SERVICE_NAME,
    "$rootScope"
  ];

  constructor(private $sce: ISCEService,
              private service: LinkedInService,
              private scope: IRootScopeService) {
    this.linkedinIcon = {title: "linkedin-box", icon: "mdi:linkedin-box"};
    this.action = $sce.trustAsResourceUrl(GatewayApiService.getLinkedInAuthUrl());
  }

  onClick(): void {
    this.service.requestSync(this.username)
      .then(() => {
        this.scope.$broadcast(LinkedInController.EVENT_SYNC_EMPLOYEE);
      }, () => {
        window.sessionStorage.setItem(LinkedInController.SESSION_ITEM, "true");
        this.scope.$broadcast(LinkedInController.EVENT_AUTH);
      });
  }
}
