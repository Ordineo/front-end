import ComponentDefinition = angular.ComponentDefinition;
import IComponentOptions = angular.IComponentOptions;
import {Milestone} from "../../../core/models/milestone";

export class MilestoneComponent implements IComponentOptions {
  static NAME:string = "milestone";
  controller:any = MilestoneController;
  template:string = require('./MilestoneComponent-template.html');
  bindings:any = {
    milestone: '<'
  };
}

export class MilestoneController {
  milestone:Milestone;
  mileStoneBadge:string;


  $onInit():void {
    this.setMilestoneBadge();
  }

  private setMilestoneBadge():void {
    this.mileStoneBadge = this.milestone.objective.objectiveType.charAt(0).toUpperCase();
  }
}
