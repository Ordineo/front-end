import IComponentOptions = angular.IComponentOptions;
import IScope = angular.IScope;
import IAngularEvent = angular.IAngularEvent;
import {Milestone} from "../../../core/models/milestone";
import IFormController = angular.IFormController;
import {Objective} from "../../../core/models/objective";
import {MilestoneService, IMilestoneService} from "../../services/MilestoneService";

export interface IMilestoneCreateBindings {
  username:string;
  onContentLoaded:Function;
  isSaveEnabled:Function;
}

export class MilestoneCreateComponent implements IComponentOptions {
  static NAME:string = "milestoneCreate";
  controller:any = MilestoneCreateController;
  template:string = require('./MilestoneCreate-template.html');
  bindings:any = {
    username: '@',
    onContentLoaded: '&',
    isSaveEnabled: '&'
  };
}

export class MilestoneCreateController implements IMilestoneCreateBindings {
  public title:string = "MilestoneCreate";
  public username:string;
  public onContentLoaded:Function;
  public isSaveEnabled:Function;
  public minDate:Date;
  private milestone:Milestone;

  static $inject = [MilestoneService.NAME, '$scope'];

  constructor(private milestoneService:IMilestoneService, private scope:IScope) {
    this.milestone = this.milestoneService.getNewMilestone();
    this.minDate = new Date();
  }

  public onObjectiveSelected(objective:Objective):void {
    this.milestoneService.setObjective(objective);
  }
  
  $onInit():void {
    this.onContentLoaded({isLoaded: true});

    this.scope.$watch('milestoneCreateForm.$valid', ()=> {
      this.isSaveEnabled({isEnabled: this.scope['milestoneCreateForm'].$valid});
    });
  }
}

