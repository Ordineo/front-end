import 'angular';
import 'angular-ui-router';
import {JWORKS360_CORE} from "./core.module";
import {IStateProvider} from "angular-ui-router";
import {IUrlRouterProvider} from "angular-ui-router";
import {LoginRoute} from "./login.route";

configureStates.$inject = ['$stateProvider', '$urlRouterProvider'];

export function configureStates($stateProvider:IStateProvider, $urlRouterProvider:IUrlRouterProvider) {

  $stateProvider.state(new LoginRoute());

  $urlRouterProvider
    .when('/', 'login')
    .otherwise('/');
}

function getStates() {
  return [
    {
      name: 'login',
      config: {
        url: '/login',
        template: `<h1>{{vm.wicked}}</h1><login is-logged="{{vm.bb}}" on-validated="vm.onValidate()"></login>`,
        controller: function () {
          this.wicked = 'hellos';
        },
        controllerAs: 'vm'
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
