import 'angular';
import 'angular-ui-router';
import {JWORKS360_CORE} from "./core.module";
import {IStateProvider} from "angular-ui-router";
import {IUrlRouterProvider} from "angular-ui-router";

configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

export function configureStates($stateProvider:IStateProvider, $urlRouterProvider:IUrlRouterProvider) {
  console.log('configre');
  var states = getStates();

  states.forEach(function (state) {
    $stateProvider.state(state.name, state.config);
  });

  $urlRouterProvider
    .when('/','login')
    .otherwise('/');
}

function getStates() {
  return [
    {
      name: 'login',
      config: {
        url: '/login',
        template: '<login></login>'
      }
    },
    {
      name: 'admin',
      config: {
        url: '/admin',
        template: '<h3>Admin</h3>'
      }
    }
  ];
}
