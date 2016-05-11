import {DashboardComponent} from "./layout/DashboardComponent";
import {AppComponent} from "./app.component";
import RouteDefinition = angular.RouteDefinition;
import {LoginComponent} from "./auth/LoginComponent";

export class DashboardRoute implements RouteDefinition{
  static NAME:string = "Dashboard";
  path:string = '/dashboard/...';
  name:string = DashboardRoute.NAME;
  component:string = DashboardComponent.NAME;
}
export class LoginRoute implements RouteDefinition{
  static NAME:string = "Login";
  path:string = '/login';
  name:string = LoginRoute.NAME;
  component:string = LoginComponent.NAME;
}
export class MainRoute implements RouteDefinition {
  static NAME:string = "App";
  path:string = '/';
  name:string = MainRoute.NAME;
  component:string = AppComponent.NAME;
  useAsDefault:boolean = true;
}
