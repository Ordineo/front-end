import IComponentOptions = angular.IComponentOptions;
import IHttpService = angular.IHttpService;
import IAugmentedJQuery = angular.IAugmentedJQuery;
import IControllerService = angular.IControllerService;
import INgModelController = angular.INgModelController;
import IFormController = angular.IFormController;
import {ICredentials} from "./ICredentials";
import Router = angular.Router;
import IRootScopeService = angular.IRootScopeService;
import {AuthService, IAuthService} from "./service/AuthService";
import {ProfileService} from "../profile/services/ProfileService";
import {DashboardComponent} from "../layout/DashboardComponent";
import {DashboardRoute} from "../app.routes";

var $ = require('jquery');

export class LoginComponent implements IComponentOptions {
  static NAME:string = 'login';

  controller:Function = LoginController;
  template:string = require('./login-template.html');
}
export class LoginController {
  /*todo remove default credentials*/
  public user:ICredentials = {
    email: 'ryan@mail.be',
    password: 'hottentottentettententoonstelling',
    username: 'ryde'
  };

  /*
   * Controller Dependencies
   * */
  static $inject = [AuthService.NAME, ProfileService.NAME];

  constructor(private authService:IAuthService, private profileService:ProfileService) {
  }

  $onInit():void {
    this.authService.authenticate();
  }

  logIn(user):void {
    this.profileService.getAboutInfoByUsername('rydg')
      .then(()=>{
        console.log('user exists');
      }, ()=>{
        console.log('user doesn\'t exist');
      });

    this.authService.logIn(user).then(()=> {
      this.$onInit();
    });
  }
}
