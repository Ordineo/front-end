import IComponentOptions = angular.IComponentOptions;
import {AuthService, IAuthService} from "../auth/service/AuthService";
import RouteDefinition = angular.RouteDefinition;
import {ProfileComponent} from "../profile/ProfileComponent";
import Router = angular.Router;
import {ProfileService} from "../profile/services/ProfileService";
import {SessionService} from "../auth/service/SessionService";
import {EmployeeName} from "../core/models/EmployeeName";
export class DashboardComponent implements IComponentOptions {
  static NAME:string = 'dashboard';

  $routeConfig:RouteDefinition[] = [
    {
      path: '/profile/:username/...',
      name: DashboardRoutes.USER_PROFILE,
      component: ProfileComponent.NAME,
      useAsDefault: true
    }
  ];

  template:string = `
  <div id="page-wrap">
    <toolbar employee-name="$ctrl.name"></toolbar>
    <ng-outlet ></ng-outlet>
  </div>
  `;
  controller:Function = DashboardComponentController;
}

export class DashboardComponentController {

  public name:EmployeeName;

  static $inject = [SessionService.NAME, ProfileService.NAME];

  constructor(private sessionService:SessionService, private profileService:ProfileService) {
  }

  $onInit():void {
    this.profileService.getBasicInfoByUsername(this.sessionService.getUsername()).then((data)=> {
      this.name = {
        first: data.firstName,
        last: data.lastName
      };
    });
  }
}

export class DashboardRoutes {
  static PROFILE:string = 'Profile';
  static USER_PROFILE:string = 'UserProfile';
}
