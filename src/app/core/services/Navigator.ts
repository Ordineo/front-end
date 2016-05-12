import {Milestone} from "../models/milestone";
import Router = angular.Router;
import {DashboardRoute} from "../../app.routes";
import {DashboardRoutes} from "../../layout/DashboardComponent";
import {ProfileRoutes} from "../../profile/ProfileRoutes";
import {MilestoneService, IMilestoneService} from "../../profile/services/MilestoneService";
import {ProfileService} from "../../profile/services/ProfileService";
export interface INavigator {
  goToMilestoneDetails(username:string, milestone:Milestone):void;
  goToUserProfile(username:string):void;
}
export class Navigator implements INavigator {
  static NAME:string = 'navigator';

  static $inject:Array<string> = [
    '$rootRouter',
    MilestoneService.NAME,
    ProfileService.NAME
  ];

  constructor(private rootRouter:Router, private milestoneService:IMilestoneService, private profileService:ProfileService) {
  }

  goToMilestoneDetails(username:string, milestone:Milestone):void {
    this.milestoneService.setSelectedMilestone(milestone);
    this.rootRouter.navigate([
      DashboardRoute.NAME,
      DashboardRoutes.USER_PROFILE,
      {username: username},
      ProfileRoutes.MILESTONES
    ])
  }

  goToUserProfile(username:string):void {
    this.profileService.setUsername(username);
    this.milestoneService.clearSelected();
    this.rootRouter.navigate([
      DashboardRoute.NAME,
      DashboardRoutes.USER_PROFILE,
      {username: username}
    ]);
  }
}

