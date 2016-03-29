import {LinkedInService} from "../../social/linkedin/LinkedInService";
import IRootScopeService = angular.IRootScopeService;
import IHttpService = angular.IHttpService;
import IRequestConfig = angular.IRequestConfig;
import ISCEService = angular.ISCEService;

export class LinkedInController {
  public linkedinIcon:any;
  public action:string;

  static SESSION_ITEM:string = 'fromAuth';
  static EVENT_AUTH:string = 'goToAuth';
  static EVENT_SYNC_EMPLOYEE:string = 'syncEmployeeData';

  static $inject:Array<string> = [
    '$sce',
    LinkedInService.SERVICE_NAME,
    '$rootScope',
    '$http'
  ];

  constructor(private $sce:ISCEService, private service:LinkedInService, private scope:IRootScopeService, private http:IHttpService) {
    this.linkedinIcon = {title: 'linkedin-box', icon: 'mdi:linkedin-box'};
    this.action = $sce.trustAsResourceUrl('https://social-ordineo.cfapps.io/connect/linkedin');
  }


  onClick():void{
    this.service.requestSync('Nivek')
      .then((ok)=> {
        this.scope.$broadcast(LinkedInController.EVENT_SYNC_EMPLOYEE);
      }, (err)=> {
        window.sessionStorage.setItem(LinkedInController.SESSION_ITEM, 'true');
        this.scope.$broadcast(LinkedInController.EVENT_AUTH);
      });
  }
}
