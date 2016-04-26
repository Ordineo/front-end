import IComponentOptions = angular.IComponentOptions;
import {AuthService, IAuthService} from "../auth/service/AuthService";
import RouteDefinition = angular.RouteDefinition;
import {ProfileComponent} from "../profile/ProfileComponent";
import RouterOutlet = angular.RouterOutlet;
import Router = angular.Router;
export class DashboardComponent implements IComponentOptions {
  static NAME:string = 'dashboard';

  require:any = {
    routerOutlet: '^ngOutlet'
  };

  $routeConfig:RouteDefinition[] = [
    {path: '/profile', name: DashboardRoutes.PROFILE, component: ProfileComponent.NAME, useAsDefault: true}
  ];

  template:string = `
  <div id="page-wrap">
    <toolbar></toolbar>
    <header></header>
    <ng-outlet></ng-outlet>
  </div>
  `;
  controller:Function = DashboardComponentController;
}

export class DashboardComponentController {
  static $inject = [AuthService.NAME];
  public routerOutlet:any;

  constructor(private authService:IAuthService) {
  }

  $onInit():void {
    this.authService.authenticate(null, ()=> {
      this.routerOutlet.$$router.navigate([DashboardRoutes.PROFILE]);
    });
  }
}

export class DashboardRoutes {
  static PROFILE:string = 'Profile';
}

