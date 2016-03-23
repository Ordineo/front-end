import {LinkedInService} from "../../social/linkedin/LinkedInService";
export class LinkedInController{
  public linkedinIcon:any;

  static $inject:Array<string> = [LinkedInService.SERVICE_NAME];

  constructor(private service:LinkedInService){
    this.linkedinIcon = {title: 'linkedin-box', icon: 'mdi:linkedin-box'};
  }

  onClick():void{
    this.service.authorize('nivek');
  }
}
