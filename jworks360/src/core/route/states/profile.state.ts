import {IState} from "angular-ui-router";
import {IStateService} from "angular-ui-router";
import {LoginState} from "./login.state";
import {IProfileSummary} from "../../../profile/summary/profile.summary.compoment";

export class ProfileState implements IState{
  static NAME = 'profile';
  name:string = ProfileState.NAME;
  url:string = '/profile';
  controller:Function = ProfileStateController;
  controllerAs:string = '$ctrl';
  template:string = require('./html/profiles.state.html');
}

class ProfileStateController{
  static $inject:Array<string> = ['$state'];

  title:string = "Profile Page!";

  summary:IProfileSummary = {
    name: 'ben',
    unit: 'jworks'
  };

  constructor(private $state:IStateService){

  }

  GoToLogin():void{
    this.$state.go(LoginState.NAME);
  }
}

