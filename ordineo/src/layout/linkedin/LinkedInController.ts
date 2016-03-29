import {LinkedInService} from "../../social/linkedin/LinkedInService";
import IRootScopeService = angular.IRootScopeService;
import IHttpService = angular.IHttpService;
import IRequestConfig = angular.IRequestConfig;
import ISCEService = angular.ISCEService;
import {GatewayApiService} from "../../gateway/service/GatewayApiService";

export class LinkedInController {
  public linkedinIcon:any;
  public action:string;
  public username:string;

  static SESSION_ITEM:string = 'fromAuth';
  static EVENT_AUTH:string = 'goToAuth';
  static EVENT_SYNC_EMPLOYEE:string = 'syncEmployeeData';

  static $inject:Array<string> = [
    '$sce',
    LinkedInService.SERVICE_NAME,
    '$rootScope',
    GatewayApiService.SERVICE_NAME
  ];

  constructor(
    private $sce:ISCEService,
    private service:LinkedInService,
    private scope:IRootScopeService,
    private gateway:GatewayApiService
  ) {
    this.linkedinIcon = {title: 'linkedin-box', icon: 'mdi:linkedin-box'};
    this.action = $sce.trustAsResourceUrl(gateway.getLinkedInAuthUrl());
  }

  onClick():void{
    this.service.requestSync(this.username)
      .then((ok)=> {
        this.scope.$broadcast(LinkedInController.EVENT_SYNC_EMPLOYEE);
      }, (err)=> {
        window.sessionStorage.setItem(LinkedInController.SESSION_ITEM, 'true');
        this.scope.$broadcast(LinkedInController.EVENT_AUTH);
      });
  }
}
