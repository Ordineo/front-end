import {IState} from "angular-ui-router";
import {IStateProvider} from "angular-ui-router";
import {IStateService} from "angular-ui-router";
import {HomeState} from "./../home/HomeState.ts";

export class LoginState implements IState{
  static NAME:string = "login";

  name:string = LoginState.NAME;
  url:string = '/login';
  template:string = require('./login.state.html');
  controllerAs:string = 'loginCtrl';
  controller:Function = LoginStateController;
}

class LoginStateController{
  static $inject:Array<string> = ['$state'];
  title:string = "Log in to Ordineo";

  constructor(private $state:IStateService){
  }

  goToAdmin():void {
    this.$state.go(HomeState.NAME);
  }
}
