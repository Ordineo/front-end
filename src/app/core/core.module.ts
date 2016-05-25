import "angular";
import "angular-ui-router";
import "angular-messages";
import {CardHeaderComponent} from "./components/card-header/CardHeaderComponent";
import {FileUploadDirective} from "./components/FileUploadDirective";
import {ActionButtonComponent} from "./components/action-button/ActionButtonComponent";
import "../gsap/TweenMax.js";
import "angular-moment";
import "moment";
import "@angular/router/angular1/angular_1_router";
import "angular-jwt";
import {TRAVERSON} from "../traverson/TraversonModule";
import {AppComponent} from "../app.component";
import {SessionService} from "../auth/service/SessionService";
import {ProfileSearchComponent} from "./components/profile-search/ProfileSearchComponent";
import {NotificationsComponent} from "./components/notifications/NotificationsComponent";
import {Navigator} from "./services/Navigator";
import IScope = angular.IScope;
import IAugmentedJQuery = angular.IAugmentedJQuery;
import {NotificationService} from "./services/NotificationService";
import {ScopeObserver} from "./services/ScopeObserver";

export const ORDINEO_CORE = "ordineo.core";

var deps: Array<string> = [
  TRAVERSON,
  "angularMoment",
  "ngAnimate",
  "ngMessages",
  "ngComponentRouter",
  "angular-jwt"
];

angular.module(ORDINEO_CORE, deps)
  .value("$routerRootComponent", AppComponent.NAME)
  .component(CardHeaderComponent.NAME, new CardHeaderComponent())
  .component(ActionButtonComponent.NAME, new ActionButtonComponent())
  .component(ProfileSearchComponent.NAME, new ProfileSearchComponent())
  .component(NotificationsComponent.NAME, new NotificationsComponent())
  .service(SessionService.NAME, SessionService)
  .service(Navigator.NAME, Navigator)
  .service(ScopeObserver.NAME, ScopeObserver)
  .service(NotificationService.NAME, NotificationService)
  .directive(FileUploadDirective.NAME, FileUploadDirective.instance())
  .directive("customOnChange", () => {
    return {
      restrict: "A",
      link: (scope: IScope, element: IAugmentedJQuery, attrs: any): any => {
        var onChangeHandler = scope.$eval(attrs.customOnChange);
        element.bind("change", onChangeHandler);
      }
    };
  })
  .config(configureJWT);

configureJWT.$inject = ["$httpProvider", "jwtInterceptorProvider"];

function configureJWT($httpProvider: any, jwtInterceptorProvider: any): void {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common["X-Requested-With"];
  jwtInterceptorProvider.tokenGetter = [SessionService.NAME, (myService: SessionService) => {
    return myService.getAuthData();
  }];
  $httpProvider.interceptors.push("jwtInterceptor");
}

