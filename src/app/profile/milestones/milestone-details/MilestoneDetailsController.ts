import IRootScopeService = angular.IRootScopeService;
import IAngularEvent = angular.IAngularEvent;
import ISCEService = angular.ISCEService;
import IScope = angular.IScope;
import {MilestoneService, IMilestoneService} from "../../services/MilestoneService";
import IWindowService = angular.IWindowService;
import Router = angular.Router;
import {Milestone} from "../../../core/models/milestone";
import {Objective} from "../../../core/models/objective";

export class MilestoneDetailsController {
  public status:number = 0;
  public isEmpty:boolean;
  //Objective
  public title:string;
  public description:string;
  public objectiveType:string;
  public tags:string[];

  //Milestone
  public createDate:string;
  public dueDate:string;
  public endDate:string;
  public moreInformation:string;

  //Comments
  public commentFirstName:string;
  public commentLastName:string;
  public content:string;
  public timestamp:string;
  public id:string;

  static $inject = [MilestoneService.NAME];

  constructor(private milestoneService:IMilestoneService) {

  }

  $onInit():void {
    if (this.id === undefined) {
      this.isEmpty = true;
    }
  }

  $onChanges():void {
    this.isEmpty = false;
    this.milestoneService.getMilestoneById(this.id).then((milestone:Milestone)=> {
      console.log(milestone);
      this.createDate = milestone.createDate;
      this.dueDate = milestone.dueDate;
      this.moreInformation = milestone.moreInformation;
      var objective:Objective = milestone['_embedded'].objective;
      this.description = objective.description;
      this.objectiveType = objective.objectiveType;
      this.tags = objective.tags;
      this.title = objective.title;
    });
  }

}
