import {IState} from "angular-ui-router";

export class LoginRoute implements IState{
  name:string = 'login';
  url:string = '/login';
  template:string = '<login on-validated="$ctrl.goToAdmin()"></login>';
  controllerAs:string = '$ctrl';
  controller:Function = LoginRouteController
}

class LoginRouteController{
  goToAdmin:Function = () => {
    console.log('Going to admin page...');
  };
}
