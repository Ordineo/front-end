import 'angular';
import 'angular-ui-router';
import {JWORKS360_CORE} from "./../core.module.ts";
import {IStateProvider} from "angular-ui-router";
import {IUrlRouterProvider} from "angular-ui-router";
import {LoginState} from "./states/login/login.state.ts";
import {HomeState} from "./states/home/HomeState.ts";
import {ProfileState} from "./states/profile/ProfileState";

configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

/* todo add authentication for routes */
export function configureStates($stateProvider:IStateProvider, $urlRouterProvider:IUrlRouterProvider) {

  $stateProvider.state(new LoginState());
  $stateProvider.state(new HomeState());
  $stateProvider.state(new ProfileState());

  $urlRouterProvider
    .when('/', 'profile')
    .otherwise('/');
}
