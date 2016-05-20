import IComponentOptions = angular.IComponentOptions;
import IAngularEvent = angular.IAngularEvent;
import './milestone-details.scss';
import IRootScopeService = angular.IRootScopeService;
import IScope = angular.IScope;
import {MilestoneService, IMilestoneService, MilestoneSelectedData} from "../../services/MilestoneService";
import IWindowService = angular.IWindowService;
import Router = angular.Router;
import {Objective} from "../../../core/models/objective";
import {Milestone} from "../../../core/models/milestone";
import IDialogService = angular.material.IDialogService;
import {MilestoneEditDialog} from "../milestone-edit-dialog/MilestoneEditDialog";

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
    'moment',
    '$mdDialog'
  ];

  constructor(private milestoneService:IMilestoneService, private scope:IScope, private moment:any, private dialog:IDialogService) {
  }

  $onInit():void {
    this.milestoneService.subscribeOnMilestoneSelected(this.scope, ($event:IAngularEvent, args:MilestoneSelectedData)=> {
      this.setViewModel(args.milestone);
    });
    var selectedMilestone:any = this.milestoneService.getSelectedMilestone();
    if (selectedMilestone !== undefined && selectedMilestone !== null) {
      this.setViewModel(selectedMilestone);
    }
  }

  showEditDialog():void {
    this.dialog.show(new MilestoneEditDialog());
  }

  setViewModel(selectedMilestone: Milestone): void {
    if (selectedMilestone) {
      this.setStatus(selectedMilestone);
      this.milestone = selectedMilestone;
      this.createDate = this.moment(selectedMilestone.createDate).format('ll');
      this.dueDate = this.moment(selectedMilestone.dueDate).format('ll');
      if (selectedMilestone.endDate) {
        this.endDate = this.moment(selectedMilestone.endDate).format('ll');
      } else {
        this.endDate = null;
      }
      this.moreInformation = selectedMilestone.moreInformation;

      var objective:Objective = selectedMilestone.objective;
      this.description = objective.description;
      this.objectiveType = objective.objectiveType;
      this.tags = objective.tags;
      this.title = objective.title;
    }
  }

  setStatus(milestone:Milestone):void {
    if (milestone) {
      var currentMoment = this.moment();
      if (currentMoment.isAfter(this.moment(milestone.dueDate))) {
        this.status = 2;
      } else if (currentMoment.isBefore(this.moment(milestone.dueDate))) {
        this.status = 0;
      }
      if (milestone.endDate) {
        this.status = 1;
      }
    } else {
      this.status = -1;
    }
  }
}

