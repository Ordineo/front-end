import IComponentOptions = angular.IComponentOptions;
import {AuthService, IAuthService} from "../auth/service/AuthService";
export class DashboardComponent implements IComponentOptions {
  static NAME:string = 'dashboard';

  template:string = `
  <div id="page-wrap">
    <toolbar></toolbar>
    <header></header>
    <profile-about username="{{profile.username}}"></profile-about>
    <milestone-container id="milestone-container" username="{{profile.username}}"></milestone-container>
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
