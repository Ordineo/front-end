import {Milestone} from "../models/milestone";
import Router = angular.Router;
import {DashboardRoute} from "../../app.routes";
import {DashboardRoutes} from "../../layout/DashboardComponent";
export interface INavigator {
  goToMilestoneDetails(username:string, milestone:Milestone):void;
}
export class Navigator implements INavigator {

  static $inject:Array<string> = ['$rootRouter'];

  constructor(private rootRouter:Router) {
  }

  goToMilestoneDetails(username:string, milestone:Milestone):void {
    this.rootRouter.navigate([
      DashboardRoute.NAME,
      DashboardRoutes.USER_PROFILE,
      {username: username},
      
    ])
  }
}

