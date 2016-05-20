import IComponentOptions = angular.IComponentOptions;
import {SummaryPageComponent} from "./summary-page/SummaryPageComponent";
import RouteDefinition = angular.RouteDefinition;
import {ProfileRoutes} from "./ProfileRoutes";
import {MilestoneDetailsPageComponent} from "./milestones-details-page/MilestoneDetailsPageComponent";
import {ProfileMenuTab} from "./profile-menu/ProfileMenuComponent";
import {ProfileService} from "./services/ProfileService";
export class ProfileComponent implements IComponentOptions {
  static NAME: string = "profile";
  require: any = {
    routerOutlet: "^ngOutlet"
  };

  template: string = `
    <!--<linkedin></linkedin>-->
    <app-header title="{{$ctrl.title}}"></app-header>
    <profile-menu
      on-tab-selected="$ctrl.onTabSelected($locals)"></profile-menu>
    <ng-outlet></ng-outlet>
  `;
  controller: Function = ProfileComponentController;
  $routeConfig: RouteDefinition[] = [
    {path: "/summary", name: ProfileRoutes.SUMMARY, component: SummaryPageComponent.NAME, useAsDefault: true},
    {
      path: "/milestones",
      name: ProfileRoutes.MILESTONES,
      component: MilestoneDetailsPageComponent.NAME
    },
  ];
}
export class ProfileComponentController {
  public routerOutlet: any;
  public title: string;
  static $inject: Array<string> = [ProfileService.NAME];

  constructor(private profileService: ProfileService) {
  }

  $routerOnActivate(next: any, previous: any): void {
    if (next.params.username !== null) {
      this.profileService.setUsername(next.params.username);
      this.profileService.getBasicInfoByUsername(next.params.username).then((data: any) => {
        this.title = data.firstName + " " + data.lastName;
      });
    }
  }

  onTabSelected($locals: any): void {
    var selectedTab: ProfileMenuTab = $locals.selectedTab;
    this.routerOutlet.$$router.navigate([selectedTab.route]);
  }
}
