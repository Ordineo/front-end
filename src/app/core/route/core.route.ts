import 'angular';
import 'angular-ui-router';
import {ORDINEO_CORE} from "./../core.module.ts";
import {IStateProvider} from "angular-ui-router";
import {IUrlRouterProvider} from "angular-ui-router";
import {ProfileState} from "./states/profile/ProfileState";

configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

/* todo add authentication for routes */
export function configureStates($stateProvider:IStateProvider, $urlRouterProvider:IUrlRouterProvider) {

  $stateProvider.state(new ProfileState());

  $urlRouterProvider
    .when('/', 'profile')
    .otherwise('/');
}
