import {IState} from "angular-ui-router";
import {IStateService} from "angular-ui-router";
import {LoginState} from "./login.state";
import {IProfileSummary} from "../../../profile/header/summary/profile.summary.compoment";

export class ProfileState implements IState {
  static NAME = 'profile';
  name:string = ProfileState.NAME;
  url:string = '/profile';
  controller:Function = ProfileStateController;
  controllerAs:string = '$ctrl';
  template:string = require('./html/profiles.state.html');
}

class ProfileStateController {
  static $inject:Array<string> = ['$state'];

  title:string = "Profile Page!";

  summary:IProfileSummary = {
    name: 'John Doe',
    unit: 'Jworks',
    xFollowers: 20,
    xFollowing: 220,
    xPosts: 129,
    xCertificates: 3,
    xPoints: 1250
  };

  constructor(private $state:IStateService) {

  }

  goToLogin():void {
    this.$state.go(LoginState.NAME);
  }
}

