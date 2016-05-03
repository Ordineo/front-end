import {AuthService, IAuthService} from "./service/AuthService";
import {LoginComponent} from "./LoginComponent";
import {SessionService, ISessionService} from "./service/SessionService";
import IRootScopeService = angular.IRootScopeService;
import Router = angular.Router;
import {ORDINEO_CORE, JWORKS360_CORE} from "../core/core.module";
export const JWORKS_AUTH = "jworksAuth";

angular
  .module(JWORKS_AUTH, [JWORKS360_CORE])
  .service(AuthService.NAME, AuthService)
  .component(LoginComponent.NAME, new LoginComponent())
  .run(assignServicesToRootScope);

assignServicesToRootScope.$inject = ['$rootScope', SessionService.NAME, AuthService.NAME];

function assignServicesToRootScope($rootScope:IRootScopeService,
                                   sessionService:ISessionService,
                                   authService:IAuthService) {
  $rootScope[SessionService.NAME] = sessionService;
  $rootScope[AuthService.NAME] = authService;
}
