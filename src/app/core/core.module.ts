import 'angular';
import 'angular-ui-router';
import 'angular-messages';
import './route/core.route.ts';
import {configureStates} from "./route/core.route.ts";
import {CardHeaderComponent} from "./components/card-header/CardHeaderComponent";
import {fadeInOnNgShow} from "./animations/animations";
import {simpleFade} from "./animations/animations";
import {editIcons} from "./animations/animations";
import {transitionHeight} from "./animations/animations";
import {flowHeight} from "./animations/animations";
import {FileUploadDirective} from "./components/FileUploadDirective";
import {ActionButtonComponent} from "./components/action-button/ActionButtonComponent";
require('../gsap/TweenMax.js');


export const ORDINEO_CORE = 'ordineo.core';

var deps:Array<string> = [
  'ui.router',
  'ngAnimate',
  'ngMessages'
];

angular.module(ORDINEO_CORE, deps)
  .config(configureStates)
  .component(CardHeaderComponent.NAME, new CardHeaderComponent())
  .component(ActionButtonComponent.NAME, new ActionButtonComponent())
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
  .animation(".trans-height", transitionHeight);
