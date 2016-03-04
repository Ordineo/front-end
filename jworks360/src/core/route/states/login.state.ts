import {IState} from "angular-ui-router";
import {IStateProvider} from "angular-ui-router";
import {IStateService} from "angular-ui-router";
import {ProfileState} from "./profile.state";

export class LoginState implements IState{
  static NAME:string = "login";

  name:string = LoginState.NAME;
  url:string = '/login';
  template:string = require('./html/login.state.html');
  controllerAs:string = 'loginCtrl';
  controller:Function = LoginStateController;
}

class LoginStateController{
  static $inject:Array<string> = ['$state'];
  title:string = "Log in to 360 tool";

  constructor(private $state:IStateService){
  }

  goToAdmin():void {
    this.$state.go(ProfileState.NAME);
  }
}
