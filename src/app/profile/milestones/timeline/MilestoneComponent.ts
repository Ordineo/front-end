import ComponentDefinition = angular.ComponentDefinition;
import IComponentOptions = angular.IComponentOptions;
import {Milestone} from "../../../core/models/milestone";
import Router = angular.Router;

export class MilestoneComponent implements IComponentOptions {
  static NAME:string = "milestone";
  controller:any = MilestoneController;
  template:string = require('./MilestoneComponent-template.html');
  bindings:any = {
    milestone: '<',
    onDetailsClick: '&'
  };
}

export class MilestoneController {
  mileStoneBadge:string;
  showDetail:boolean = false;

  /*input*/
  milestone:Milestone;

  /*output*/
  onDetailsClick:Function;

  constructor() {
  }

  /*devblock:start*/
  public testSetMilestoneBadge:Function = this.setMilestoneBadge;
  /*devblock:end*/

  $onInit():void {
    this.setMilestoneBadge();
  }

  private setMilestoneBadge():void {
    this.mileStoneBadge = this.milestone.objective.objectiveType.charAt(0).toUpperCase();
  }

  public toggleShowDetail():void {
    this.showDetail = !this.showDetail;
  }

  private gotoMilestoneDetail():void {
    this.onDetailsClick({milestone: this.milestone});
  }
}
