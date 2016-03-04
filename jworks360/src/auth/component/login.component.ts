import {AUTH_SERVICE} from "../service/auth.service";
import {IAuthService} from "../service/auth.service";
import {Person} from "../../persons/person";
import {ICredentials} from "../service/auth.service";
import IComponentOptions = angular.IComponentOptions;
import IToastService = angular.material.IToastService;

export const LOGIN = "login";

interface ILogin {
  title:string
  onValidated:Function
  user:ICredentials
}

export class LoginComponent implements IComponentOptions {

  bindings:any = {
    title: '@',
    onValidated: '&'
  };

  controller:Function = LoginComponentController;
  controllerAs:string = '$ctrl';
  template:string = require('./login.component.html');
}

class LoginComponentController implements ILogin {

  static authError:string = 'Authentication Failed.';

  static $inject:Array<string> = [AUTH_SERVICE, '$mdToast'];

  title:string;
  onValidated:Function;
  user:ICredentials;

  constructor(private authService:IAuthService, private $mdToast:IToastService) {
    this.user = {
      email: '',
      pw: ''
    };
  }

  validate():void {
    if (this.authService.validateCredentials(this.user)) {
      this.onValidated();
      this.authService.createSession(this.user.email);
    } else {
      this.showNotAuthorizedMessage();
    }
  }

  //TODO fix toast positioning
  showNotAuthorizedMessage():void {
    console.log('show toast');
    this.$mdToast.show(
      this.$mdToast.simple()
        .textContent(LoginComponentController.authError)
        .action('close')
        .highlightAction(false)
        .position('bottom left right'));
  }
}
