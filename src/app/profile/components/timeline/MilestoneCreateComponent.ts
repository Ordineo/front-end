import IComponentOptions = angular.IComponentOptions;
import IScope = angular.IScope;
import IAngularEvent = angular.IAngularEvent;
import {Milestone} from "../../../core/models/milestone";

export class MilestoneCreateComponent implements IComponentOptions {
  static NAME:string = "milestoneCreate";
  controller:any = MilestoneCreateController;
  template:string = require('./MilestoneCreate-template.html');
  bindings:any = {
    username: '@',
    onContentLoaded: '&'
  };
}

export class MilestoneCreateController {
  public title:string = "MilestoneCreate";
  public username:string;
  public onContentLoaded:Function;

  public milestone:Milestone;

  constructor() {
    this.milestone = <Milestone>{};
  }
  $onInit():void {
    this.onContentLoaded({isLoaded: true});
  }

  private save():void {
    this.milestone.createDate = new Date();
  }
}
