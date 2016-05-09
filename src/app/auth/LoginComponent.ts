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
var $ = require('jquery');

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

  public errorMessage;

  /*
   * Controller Dependencies
   * */
  static $inject = [AuthService.NAME, SessionService.NAME];

  constructor(private authService:IAuthService, private sessionService:ISessionService) {
    $('#login-error').hide();
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
        if (error.status === 401) {
          this.errorMessage = "Login failed. Invalid username or password";
          this.showErrorMessage("Login failed. Invalid username or password");
        } else {
          this.errorMessage = "Connection Error";
          this.showErrorMessage("Connection Error");
        }
      }
    )
  }

  showErrorMessage(msg:string):void {
    $('#login-error').slideDown(50);
  }
}
