import ComponentDefinition = angular.ComponentDefinition;
import IComponentOptions = angular.IComponentOptions;
import {Milestone} from "../../../core/models/milestone";
import Router = angular.Router;
import {DashboardRoute} from "../../../app.routes";
import {DashboardRoutes} from "../../../layout/DashboardComponent";
import {ProfileRoutes} from "../../ProfileRoutes";
import {ProfileService} from "../../services/ProfileService";
import {UrlHelper} from "../../../util/UrlHelper";

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
  showDetail:boolean = false;


  static $inject:Array<string> = ['$rootRouter', ProfileService.NAME];

  constructor(private $rootRouter:Router, private ProfileService:ProfileService) {
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
    this.$rootRouter.navigate([DashboardRoute.NAME, DashboardRoutes.USER_PROFILE, {username: this.ProfileService.username},
      ProfileRoutes.MILESTONES_DETAILS, {id: UrlHelper.getMilestoneIdFromUrl(this.milestone)}]);
  }
}
