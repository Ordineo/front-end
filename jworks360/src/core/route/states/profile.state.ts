import {IState} from "angular-ui-router";
import {IStateService} from "angular-ui-router";
import {LoginState} from "./login.state";

export var profileState:IState = {
  name:'profile',
  url:'/profile',
  controller: ProfileStateController,
  controllerAs: '$ctrl',
  template: `<h2>{{$ctrl.title}}</h2><button ng-click="$ctrl.goToLogin()">To Login</button>`
};

ProfileStateController.$inject = ['$state'];

function ProfileStateController($state:IStateService){
  this.title = "Profile Page!";
  this.goToLogin = GoToLogin;

  function GoToLogin(){
    $state.go(LoginState.NAME);
  }
}

