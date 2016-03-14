import 'angular';
import 'angular-ui-router';
import './route/core.route.ts';
import {configureStates} from "./route/core.route.ts";
import {CardHeaderComponent} from "./components/card-header/CardHeaderComponent";
import {LoadingStatusDirective} from "./components/loading-status/LoadingStatusDirective";

require('angular-chartist.js');
require('chartist/dist/chartist.css');
require('chartist');

export const ORDINEO_CORE = 'ordineo.core';

var deps:Array<string> = [
  'ui.router',
  'angular-chartist',
  'ngAnimate'
];

angular.module(ORDINEO_CORE, deps)
  .config(configureStates)
  .component(CardHeaderComponent.NAME, new CardHeaderComponent())
  .directive(LoadingStatusDirective.NAME, LoadingStatusDirective.instance)
  .animation(".test", fadeInOnNgShow);

export function fadeInOnNgShow():any{
  return {
    removeClass: function (element, className, done) {
      if(className === 'ng-hide'){
        TweenMax.set(element, {autoAlpha: 0, scale: 1});
        TweenMax.to(element, 1, {ease: Circ.easeOut, autoAlpha: 1, onComplete: done});
      }
    }
  };
}
