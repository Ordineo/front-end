import {IState} from "angular-ui-router";
import IControllerProvider = angular.IControllerProvider;

export class ProfileState implements IState {
  static NAME:string = "profileState";

  name:string = ProfileState.NAME;
  url:string = '/profile';
  controller:Function = ProfileStateCtrl;
  controllerAs:string = '$profile';
  template:string = require('./profile-state.html');
}

export class ProfileStateCtrl {

}
