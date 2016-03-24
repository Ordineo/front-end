import {LinkedInService} from "../../social/linkedin/LinkedInService";
import IRootScopeService = angular.IRootScopeService;
export class LinkedInController {
  public linkedinIcon:any;
  public url:string;

  static EVENT_AUTH:string = 'goToAuth';
  static $inject:Array<string> = [LinkedInService.SERVICE_NAME, '$rootScope'];

  isAuthorized:boolean;

  constructor(private service:LinkedInService, private scope:IRootScopeService) {
    this.linkedinIcon = {title: 'linkedin-box', icon: 'mdi:linkedin-box'};
    //
    // service.authorize('Nivek')
    //   .then((ok)=> {
    //     console.log(ok);
    //     console.log("OK" + ok.status);
    //     this.isAuthorized = true;
    //   }, (err)=> {
    //     console.log(err);
    //     console.log("error " + err.status);
    //     this.isAuthorized = false;
    //   });
  }

  onClick():void{
    this.service.authorize('Nivek')
      .then((ok)=> {
        console.log('ok');
        this.isAuthorized = true;
      }, (err)=> {
        window.sessionStorage.setItem('linkedin', 'authorized');
        console.log(err);
        console.log("error " + err.status);
        this.isAuthorized = false;
        this.scope.$broadcast(LinkedInController.EVENT_AUTH);
      });
  }
}
