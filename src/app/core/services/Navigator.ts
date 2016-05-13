import {Milestone} from "../models/milestone";
import Router = angular.Router;
import {DashboardRoute} from "../../app.routes";
import {DashboardRoutes} from "../../layout/DashboardComponent";
import {ProfileRoutes} from "../../profile/ProfileRoutes";
import {MilestoneService, IMilestoneService} from "../../profile/services/MilestoneService";
import {ProfileService} from "../../profile/services/ProfileService";
import {ProfileMenuState} from "../../profile/profile-menu/ProfileMenuState";
import {MilestonesTab} from "../../profile/profile-menu/tabs/MilestonesTab";
import {SummaryTab} from "../../profile/profile-menu/tabs/SummaryTab";
import {UrlHelper} from "../../util/UrlHelper";
export interface INavigator {
  goToUserProfileWithLastNavigation(username:string):void;
  goToMilestoneDetails(username:string, milestone:Milestone):void;
  goToUserProfile(username:string):void;
}
export class Navigator implements INavigator {
  static NAME:string = 'navigator';

  static $inject:Array<string> = [
    '$rootRouter',
    MilestoneService.NAME,
    ProfileService.NAME,
    ProfileMenuState.NAME,
  ];

  constructor(private rootRouter:Router, private milestoneService:IMilestoneService, private profileService:ProfileService, private profileMenuState:ProfileMenuState) {
  }

  goToMilestoneDetails(username:string, milestone:Milestone):void {
    this.milestoneService.setSelectedMilestone(milestone);
    this.profileMenuState.notifyTabSelected(MilestonesTab.NAME);
    this.rootRouter.navigate([
      DashboardRoute.NAME,
      DashboardRoutes.USER_PROFILE,
      {username: username},
      ProfileRoutes.MILESTONES
    ])
  }

  goToUserProfileWithLastNavigation(username:string):void {
    this.profileService.setUsername(username);
    this.milestoneService.clearSelected();
    var lastSegment = UrlHelper.getLastSegment(this.rootRouter.lastNavigationAttempt);
    var url = `/dashboard/profile/${username}/${lastSegment}`;

    console.log(url);
    this.rootRouter.navigateByUrl(url).then(()=> {
    });
  }

  goToUserProfile(username:string):void {
    this.profileService.setUsername(username);
    this.profileMenuState.notifyTabSelected(SummaryTab.NAME);
    this.milestoneService.clearSelected();
    this.rootRouter.navigate([
      DashboardRoute.NAME,
      DashboardRoutes.USER_PROFILE,
      {username: username}
    ]);
  }
}

