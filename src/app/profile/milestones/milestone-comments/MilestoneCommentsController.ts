import IRootScopeService = angular.IRootScopeService;
import IAngularEvent = angular.IAngularEvent;
import ISCEService = angular.ISCEService;
import IScope = angular.IScope;
import {MilestoneService} from "../../services/MilestoneService";
var $ = require('jquery');

export class MilestoneCommentsController {
  //Comments
  public commentFirstName:string = "Ryan";
  public commentLastName:string = "De Gruyter";
  public message:string = "You should also go for the OCP certificate.";
  public timestamp:string = "09:18, 15 February";
  public commentFieldData:string = "";

  static $inject:Array<string> = [
    MilestoneService.NAME
  ];

  constructor(public milestoneService:MilestoneService) {
    milestoneService.getComments()
      .then((comments:any)=> {
        console.log(comments);
      }, (error)=> {
        console.log(error);
      });
  }

  public addComment():void {
    if (this.commentFieldData.trim() !== '') {
      //Post data
      console.log(this.commentFieldData);

      $('#commentField').blur();
      this.commentFieldData = "";
    }
  }
}
