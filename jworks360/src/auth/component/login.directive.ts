
import IDirective = angular.IDirective;
var templateUrl = require('./login.html');
export const LOGIN = "login";

interface ILoginVm {
  isLogged:boolean
}

export class LoginDirective implements IDirective {
  restrict:string = 'E';
  bindToController:any = {
    isLogged: '@'
  };
  controller:Function = LoginController;
  controllerAs:string = '$ctrl';
  template:string = templateUrl;

  static instance() {
    return new LoginDirective();
  }
}

function LoginController(){
  var isLogged:Boolean = false;
}
