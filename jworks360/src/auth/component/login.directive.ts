import IDirective = angular.IDirective;
var templateUrl = require('./login.html');
export const LOGIN = "login";

interface ILoginBindings {
  isLogged:String
}
interface ILoginVm {
  isLogged:boolean
}

export class LoginDirective implements IDirective {
  restrict:string = 'E';
  bindToController:ILoginBindings = {
    isLogged: '@'
  };
  controller:Function = LoginController;
  controllerAs:string = '$ctrl';
  template:string = templateUrl;

  static instance() {
    return new LoginDirective();
  }
}

class LoginController implements ILoginVm {
  isLogged:boolean;
}
