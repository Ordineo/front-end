import {LinkedInService} from "../../social/linkedin/LinkedInService";
export class LinkedInController {
  public linkedinIcon:any;
  public url:string;

  static $inject:Array<string> = [LinkedInService.SERVICE_NAME];

  isAuthorized:boolean;

  constructor(private service:LinkedInService) {
    this.linkedinIcon = {title: 'linkedin-box', icon: 'mdi:linkedin-box'};

    service.authorize('Nivek')
      .then((ok)=> {
        console.log("error " + ok.status);
        this.isAuthorized = true;
      }, (err)=> {
        console.log("error " + err.status);
        this.isAuthorized = false;
      });
  }
}
