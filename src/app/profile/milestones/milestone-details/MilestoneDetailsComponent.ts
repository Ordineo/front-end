import IComponentOptions = angular.IComponentOptions;
import IAngularEvent = angular.IAngularEvent;
import './milestone-details.scss';
import IRootScopeService = angular.IRootScopeService;
import IScope = angular.IScope;
import {MilestoneService, IMilestoneService} from "../../services/MilestoneService";
import IWindowService = angular.IWindowService;
import Router = angular.Router;
import {Objective} from "../../../core/models/objective";
import {Milestone} from "../../../core/models/milestone";

export class MilestoneDetailsComponent implements IComponentOptions {
  static NAME:string = "milestoneDetails";
  static CONTROLLER_AS:string = 'milestoneDetails';

  controller:Function = MilestoneDetailsController;
  controllerAs:string = MilestoneDetailsComponent.CONTROLLER_AS;
  template:string = require('./milestone-details.html');
  bindings:any = {
    onContentLoaded: '&'
  };
}
export class MilestoneDetailsController {
  public status:number = 0;
  public milestone:Milestone;

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

  static $inject = [
    MilestoneService.NAME,
    '$scope',
    'moment'
  ];

  constructor(private milestoneService:IMilestoneService, private scope:IScope, private moment:any) {
  }

  $onInit():void {
    this.milestoneService.subscribeOnMilestoneSelected(this.scope, this.updateViewModel());
    var selectedMilestone:any = this.milestoneService.getSelectedMilestone();
    if (selectedMilestone !== undefined) {
      this.setViewModel(selectedMilestone);
    }
  }

  updateViewModel():()=>any {
    return ()=> {
      this.setViewModel(this.milestoneService.getSelectedMilestone());
    };
  }

  setViewModel(selectedMilestone:any):void {
    if (selectedMilestone) {
      this.setStatus(selectedMilestone);
      this.milestone = selectedMilestone;
      this.createDate = selectedMilestone.createDate;
      this.dueDate = selectedMilestone.dueDate;
      this.moreInformation = selectedMilestone.moreInformation;

      var objective:Objective = selectedMilestone.objective;
      this.description = objective.description;
      this.objectiveType = objective.objectiveType;
      this.tags = objective.tags;
      this.title = objective.title;
    }
  }

  setStatus(milestone:Milestone):void {
    var currentMoment = this.moment();
    if (currentMoment.isAfter(this.moment(milestone.dueDate))) {
      this.status = 2;
    } else if (currentMoment.isBefore(this.moment(milestone.dueDate))) {
      this.status = 0;
    }
    if (milestone.endDate) {
      this.status = 1;
    }
  }
}

