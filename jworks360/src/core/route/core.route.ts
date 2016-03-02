import 'angular';
import 'angular-ui-router';
import {JWORKS360_CORE} from "./../core.module.ts";
import {IStateProvider} from "angular-ui-router";
import {IUrlRouterProvider} from "angular-ui-router";
import {LoginState} from "./states/login.state";
import {profileState} from "./states/profile.state";

configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

export function configureStates($stateProvider:IStateProvider, $urlRouterProvider:IUrlRouterProvider) {

  $stateProvider.state(new LoginState());
  $stateProvider.state(profileState);

  $urlRouterProvider
    .when('/', 'login')
    .otherwise('/');
}
