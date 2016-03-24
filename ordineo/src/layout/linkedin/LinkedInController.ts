import {LinkedInService} from "../../social/linkedin/LinkedInService";
import IRootScopeService = angular.IRootScopeService;
import IHttpService = angular.IHttpService;
import IRequestConfig = angular.IRequestConfig;
import ISCEService = angular.ISCEService;

export class LinkedInController {
  public linkedinIcon:any;
  public action:string;

  static EVENT_AUTH:string = 'goToAuth';
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
    this.service.authorize('Nivek')
      .then((ok)=> {
      //todo  sync

      }, (err)=> {
        window.sessionStorage.setItem('linkedin', 'authorized');
        this.scope.$broadcast(LinkedInController.EVENT_AUTH);
      });
  }
}
