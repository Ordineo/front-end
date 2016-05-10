import IRootScopeService = angular.IRootScopeService;
import IAngularEvent = angular.IAngularEvent;
import ISCEService = angular.ISCEService;
import IScope = angular.IScope;

export class MilestoneDetailsController {
  public status:number = 0;

  //User
  public userFirstName:string = "Kevin";
  public userLastName:string = "Van Houtte";

  //Objective
  public title:string = "OCA Certification";
  public description:string = "This is the first Java certificate.";
  public objectiveType:string = "Certificate";
  public tags:string[] = ["Java", "Programming"];

  //Milestone
  public createDate:string = "2016-02-06";
  public dueDate:string = "2016-05-03";
  public endDate:string = "2016-04-26";
  public moreInformation:string = "More information about this milestone.";

  //Comments
  public commentFirstName:string = "Ryan";
  public commentLastName:string = "De Gruyter";
  public content:string = "You should also go for the OCP certificate.";
  public timestamp:string = "09:18, 15 February";

  constructor() {
    
  }
}
