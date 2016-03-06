import {IState} from "angular-ui-router";
import {IStateService} from "angular-ui-router";
import {LoginState} from "./../login/login.state.ts";
import {IProfileSummary} from "../../../../profile/header/summary/profile.summary.compoment.ts";

export class HomeState implements IState {
  static NAME = 'home';
  name:string = HomeState.NAME;
  url:string = '/home';
  controller:Function = HomeStateCtrl;
  controllerAs:string = '$ctrl';
  template:string = require('./home-state.html');
}

class HomeStateCtrl {
  static $inject:Array<string> = ['$state'];

  public title:string = "Home Page";
  public menuItems:Array<string> = ['About', 'Points', 'Learning', 'Activity'];

  constructor(private $state:IStateService) {

  }

  public goToLogin():void {
    this.$state.go(LoginState.NAME);
  }
}

