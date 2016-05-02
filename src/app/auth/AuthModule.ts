import {AuthService, IAuthService} from "./service/AuthService";
import {LoginComponent} from "./LoginComponent";
import {SessionService, ISessionService} from "./service/SessionService";
import IRootScopeService = angular.IRootScopeService;
import Router = angular.Router;
import {ORDINEO_CORE} from "../core/core.module";
export const JWORKS_AUTH = "jworksAuth";

angular
  .module(JWORKS_AUTH, [ORDINEO_CORE])
  .service(AuthService.NAME, AuthService)
  .service(SessionService.NAME, SessionService)
  .component(LoginComponent.NAME, new LoginComponent())
  .run(assignServicesToRootScope);

assignServicesToRootScope.$inject = ['$rootScope', SessionService.NAME, AuthService.NAME];

function assignServicesToRootScope($rootScope:IRootScopeService,
                                   sessionService:ISessionService,
                                   authService:IAuthService) {
  $rootScope[SessionService.NAME] = sessionService;
  $rootScope[AuthService.NAME] = authService;
}
