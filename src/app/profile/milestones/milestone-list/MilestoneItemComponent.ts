import ComponentDefinition = angular.ComponentDefinition;
import IComponentOptions = angular.IComponentOptions;
import {Milestone} from "../../../core/models/milestone";
import Router = angular.Router;
import {DashboardRoute} from "../../../app.routes";
import {DashboardRoutes} from "../../../layout/DashboardComponent";
import {ProfileRoutes} from "../../ProfileRoutes";
import {ProfileService} from "../../services/ProfileService";
import {UrlHelper} from "../../../util/UrlHelper";

export class MilestoneItemComponent implements IComponentOptions {
  static NAME:string = "milestoneItem";
  controller:any = MilestoneItemController;
  template:string = require('./MilestoneItem-template.html');
  bindings:any = {
    milestone: '<'
  };
}

export class MilestoneItemController {
  milestone:Milestone;

  static $inject:Array<string> = ['$rootRouter', ProfileService.NAME];

  constructor(private $rootRouter:Router, private ProfileService:ProfileService) {
  }

  private gotoMilestoneDetail():void {
    this.$rootRouter.navigate([DashboardRoute.NAME, DashboardRoutes.USER_PROFILE, {username: this.ProfileService.username},
      ProfileRoutes.MILESTONES_DETAILS, {id: UrlHelper.getMilestoneIdFromUrl(this.milestone)}]);
  }
}
