import IComponentOptions = angular.IComponentOptions;
import IHttpService = angular.IHttpService;
import IAugmentedJQuery = angular.IAugmentedJQuery;
import IControllerService = angular.IControllerService;
import INgModelController = angular.INgModelController;
import IFormController = angular.IFormController;

export class LoginComponent implements IComponentOptions {
  static NAME:string = 'login';

  controller:Function = LoginController;
  template:string = require('./login-template.html');
}
export class LoginController {
  public user:ICredentials = <ICredentials>{};

  /*
   * Controller Dependencies
   * */
  static $inject = [];

  constructor() {
  }

  /*
   * component lifecycle hooks
   * */
  $postLink():void {
  }
}
