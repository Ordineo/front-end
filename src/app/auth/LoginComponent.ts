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
import {DashboardComponent} from "../layout/DashboardComponent";
import {DashboardRoute} from "../app.routes";

export class LoginComponent implements IComponentOptions {
  static NAME:string = 'login';

  controller:Function = LoginController;
  template:string = require('./login-template.html');
}
export class LoginController {
  public user:ICredentials = {
    email: 'ryan@mail.be',
    password: 'hottentottentettententoonstelling',
    username: 'ryde'
  };

  /*
   * Controller Dependencies
   * */
  static $inject = ['$rootRouter',AuthService.NAME];

  constructor(private $router:Router, private authService:IAuthService) {
  }

  /*
   * component lifecycle hooks
   * */
  $postLink():void {
  }

  logIn(user):void {
    this.authService.logIn(user).then(()=> {
      this.$router.navigate([DashboardRoute.NAME]);
    });
  }
}
