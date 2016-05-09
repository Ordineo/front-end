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
import {DashboardRoute} from "../app.routes";
import {ISessionService, SessionService} from "./service/SessionService";
require('../../assets/images/jworks-logo-nomargin.png');

require('./login.scss');

export class LoginComponent implements IComponentOptions {
  static NAME:string = 'login';

  controller:Function = LoginController;
  template:string = require('./login-template.html');
}
export class LoginController {
  /*todo remove default credentials*/
  public user:ICredentials = {
    username: 'Nivek',
    password: 'password'
  };

  /*
   * Controller Dependencies
   * */
  static $inject = [AuthService.NAME, SessionService.NAME];

  constructor(private authService:IAuthService, private sessionService:ISessionService) {
  }

  $onInit():void {
    this.authService.authenticate([DashboardRoute.NAME], null);
  }

  logIn(user):void {
    this.authService.logIn(user).then(
      (res)=> {
        this.sessionService.setAuthData(res.data['token']);
        this.authService.authenticate([DashboardRoute.NAME], null);
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
