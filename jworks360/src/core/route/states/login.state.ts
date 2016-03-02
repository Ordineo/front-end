import {IState} from "angular-ui-router";
import {IStateProvider} from "angular-ui-router";
import {IStateService} from "angular-ui-router";
import {profileState} from "./profile.state";

export class LoginState implements IState{
  static NAME:string = "login";

  name:string = LoginState.NAME;
  url:string = '/login';
  template:string = `<login on-validated="$ctrl.goToAdmin()"></login>`;
  controllerAs:string = '$ctrl';
  controller:Function = LoginStateController;
}

class LoginStateController{
  static $inject:Array<string> = ['$state'];

  constructor(private $state:IStateService){
  }

  goToAdmin():void {
    this.$state.go(profileState);
  }
}
