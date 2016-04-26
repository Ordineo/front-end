import IComponentOptions = angular.IComponentOptions;
import {AuthService, IAuthService} from "../auth/service/AuthService";
import RouteDefinition = angular.RouteDefinition;
export class DashboardComponent implements IComponentOptions {
  static NAME:string = 'dashboard';

  $routeConfig:RouteDefinition[] = [
    {path: "/profile", name: "Profile", component: "", useAsDefault: true}
  ];

  template:string = `
  <div id="page-wrap">
    <toolbar></toolbar>
    <header></header>
    <ng-outlet></ng-outlet>
    <!--<profile-about username="{{profile.username}}"></profile-about>
    <milestone-container id="milestone-container" username="{{profile.username}}"></milestone-container>-->
  </div>
  `;
  controller:Function = DashboardComponentController;
}
export class DashboardComponentController {
  static $inject = [AuthService.NAME];

  constructor(private authService:IAuthService) {
  }

  $onInit():void {
    this.authService.authenticate();
  }
}
