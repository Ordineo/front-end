import 'angular';
import 'angular-ui-router';
import {JWORKS360_CORE} from "./../core.module.ts";
import {IStateProvider} from "angular-ui-router";
import {IUrlRouterProvider} from "angular-ui-router";
import {LoginState} from "./states/login.state";
import {ProfileState} from "./states/profile.state";

configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

/* todo add authentication for routes */
export function configureStates($stateProvider:IStateProvider, $urlRouterProvider:IUrlRouterProvider) {

  $stateProvider.state(new LoginState());
  $stateProvider.state(new ProfileState());

  $urlRouterProvider
    .when('/', 'login')
    .otherwise('/');
}
