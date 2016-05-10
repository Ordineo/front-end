import IComponentOptions = angular.IComponentOptions;
import {SummaryPageComponent} from "./summary-page/SummaryPageComponent";
import RouteDefinition = angular.RouteDefinition;
import {MilestoneDetailsComponent} from "./milestones/milestone-details/MilestoneDetailsComponent";
import {ProfileRoutes} from "./ProfileRoutes";
export class ProfileComponent implements IComponentOptions {
  static NAME:string = "profile";
  require:any = {
    routerOutlet: '^ngOutlet'
  };

  template:string = `
    <!--<linkedin></linkedin>-->
    <app-header title="hello world"></app-header>
    <profile-menu></profile-menu>
    <ng-outlet></ng-outlet>
  `;
  controller:Function = ProfileComponentController;
  $routeConfig:RouteDefinition[] = [
    {path: '/summary', name: ProfileRoutes.SUMMARY, component: SummaryPageComponent.NAME},
    {path: '/milestones', name: ProfileRoutes.MILESTONES, component: MilestoneDetailsComponent.NAME}
  ];
}
export class ProfileComponentController {
  public routerOutlet:any;

  $onInit():void {
    this.routerOutlet.$$router.navigate([ProfileRoutes.SUMMARY]);
  }
}
