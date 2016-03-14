import 'angular';
import 'angular-ui-router';
import './route/core.route.ts';
import {configureStates} from "./route/core.route.ts";
import {CardHeaderComponent} from "./components/card-header/CardHeaderComponent";

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
  .animation(".test", partialAnimation);

function partialAnimation() {
  console.log('partialanim');
  return {
    addClass: function (element, className, done) {

      if (className !== "ng-hide") {
        done();
        return;
      }

      TweenMax.set(element, {transformOrigin: "left bottom"});
      TweenMax.to(element, 0.3, {autoAlpha: 0, scale: 0.5, onComplete: done});
    },
    removeClass: function (element, className, done) {

      if (className !== "ng-hide") {
        done();
        return;
      }

      TweenMax.set(element, {autoAlpha: 0, scale: 1, x: 500});
      TweenMax.to(element, 0.5, {x: 0, autoAlpha: 1, onComplete: done});
    }
  };
}
