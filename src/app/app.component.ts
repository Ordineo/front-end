import IComponentOptions = angular.IComponentOptions;
import Router = angular.Router;
import RouteDefinition = angular.RouteDefinition;
import {MainRoute, DashboardRoute, LoginRoute} from "./app.routes";
import './app-component.scss';
import {AuthService, IAuthService} from "./auth/service/AuthService";

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
  static $inject = [AuthService.NAME];

  constructor(private authService:IAuthService) {
  }

  $onInit():void {
    this.authService.authenticate([DashboardRoute.NAME], null);
  }
}
