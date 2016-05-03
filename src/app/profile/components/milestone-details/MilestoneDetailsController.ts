import IRootScopeService = angular.IRootScopeService;
import IAngularEvent = angular.IAngularEvent;
import ISCEService = angular.ISCEService;
import IScope = angular.IScope;

export class MilestoneDetailsController {
  //User
  public user:string = "Nivek";
  
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

  constructor() {

  }
}
