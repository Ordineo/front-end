import IDirective = angular.IDirective;
import {AUTH_SERVICE} from "../service/auth.service";
import {IAuthService} from "../service/auth.service";
import {Person} from "../../persons/person";
import {ICredentials} from "../service/auth.service";

export const LOGIN = "login";

interface ILoginVm {
  onValidated:Function
  user:ICredentials
}

export class LoginDirective implements IDirective {
  restrict:string = 'E';
  bindToController:any = {
    isLogged: '@',
    onValidated: '&'
  };
  controller:Function = LoginController;
  controllerAs:string = 'vm';
  template:string = require('./login.html');

  static instance() {
    return new LoginDirective();
  }
}

class LoginController implements ILoginVm{

  static $inject:Array<string> = [AUTH_SERVICE];

  onValidated:Function;
  isLogged:boolean;
  user:ICredentials;

  constructor(private authService:IAuthService) {
    this.user = {
      email:'',
      pw:''
    };
  }

  validate():void {
    if(this.authService.isAuthorized(this.user)){
      this.onValidated();
    }
  }
}
