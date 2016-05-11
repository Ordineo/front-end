import IComponentOptions = angular.IComponentOptions;
import Router = angular.Router;
import RouteDefinition = angular.RouteDefinition;
import {MainRoute, DashboardRoute, LoginRoute} from "./app.routes";
import './app-component.scss';
import {AuthService, IAuthService} from "./auth/service/AuthService";
import {DashboardRoutes} from "./layout/DashboardComponent";
import {SessionService} from "./auth/service/SessionService";
import {ProfileService} from "./profile/services/ProfileService";

export class AppComponent implements IComponentOptions {
  static NAME:string = "app";

  controller:Function = AppComponentController;
  template:string = require('./app-component.html');
  $routeConfig:RouteDefinition[] = [
    new MainRoute(),
    new DashboardRoute(),
    new LoginRoute()
  ];
}
export class AppComponentController {
  static $inject = [AuthService.NAME, ProfileService.NAME, SessionService.NAME];

  constructor(private authService:IAuthService, private profileService:ProfileService, private sessionService:SessionService) {
  }

  $routerOnActivate(next:any, previous:any):void {
    if (next.params.username !== undefined) {
      this.profileService.setUsername(next.params.username);
    } else {
      this.profileService.setUsername(this.sessionService.getUsername());
    }
    this.authService.authenticate([
      DashboardRoute.NAME,
      DashboardRoutes.USER_PROFILE,
      {username: this.profileService.username}
    ], null);
  }
}
