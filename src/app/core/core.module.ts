import 'angular';
import 'angular-ui-router';
import 'angular-messages';
import {CardHeaderComponent} from "./components/card-header/CardHeaderComponent";
import {fadeInOnNgShow} from "./animations/animations";
import {simpleFade} from "./animations/animations";
import {editIcons} from "./animations/animations";
import {transitionHeight} from "./animations/animations";
import {flowHeight} from "./animations/animations";
import {FileUploadDirective} from "./components/FileUploadDirective";
import {ActionButtonComponent} from "./components/action-button/ActionButtonComponent";
import 'rx-angular';
import '../gsap/TweenMax.js';
import 'angular-moment';
import 'moment';
import '@angular/router/angular1/angular_1_router';
import 'angular-jwt';
import {TRAVERSON} from "../traverson/TraversonModule";
import {AppComponent} from "../app.component";
import {SessionService} from "../auth/service/SessionService";

export const JWORKS360_CORE = 'jworks360.core';

var deps:Array<string> = [
  TRAVERSON,
  'angularMoment',
  'ngAnimate',
  'ngMessages',
  'rx',
  'ngComponentRouter',
  'angular-jwt'
];

angular.module(JWORKS360_CORE, deps)
  .value('$routerRootComponent', AppComponent.NAME)
  .component(CardHeaderComponent.NAME, new CardHeaderComponent())
  .component(ActionButtonComponent.NAME, new ActionButtonComponent())
  .service(SessionService.NAME, SessionService)
  .directive(FileUploadDirective.NAME, FileUploadDirective.instance())
  .directive('customOnChange', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs:any) {
        var onChangeHandler = scope.$eval(attrs.customOnChange);
        element.bind('change', onChangeHandler);
      }
    };
  })
  .animation(".fade", fadeInOnNgShow)
  .animation(".simple-fade", simpleFade)
  .animation(".edit-icons-fade", editIcons)
  .animation(".flow-height", flowHeight)
  .animation(".trans-height", transitionHeight)
  .config(configureJWT);

configureJWT.$inject = ['$httpProvider', 'jwtInterceptorProvider'];

function configureJWT($httpProvider, jwtInterceptorProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  jwtInterceptorProvider.tokenGetter = [SessionService.NAME, function (myService) {
    return myService.getAuthData();
  }];
  $httpProvider.interceptors.push('jwtInterceptor'); //todo
}

