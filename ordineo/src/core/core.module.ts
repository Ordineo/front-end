import 'angular';
import 'angular-ui-router';
import './route/core.route.ts';
import {configureStates} from "./route/core.route.ts";
import {CardHeaderComponent} from "./components/card-header/CardHeaderComponent";

export const ORDINEO_CORE = 'ordineo.core';

var deps:Array<string> = [
  'ui.router',
  'ngAnimate'
];

angular.module(ORDINEO_CORE, deps)
  .config(configureStates)
  .component(CardHeaderComponent.NAME, new CardHeaderComponent())
  .animation(".test", fadeInOnNgShow)
  .animation(".simple-fade", simpleFade)
  .animation(".edit-icons-fade", editIcons)
  .animation(".trans-height", transitionHeight);

require('../gsap/TweenMax.js');

export function transitionHeight():any {
  return {
    removeClass: function (element, className, done) {
      if (className === 'ng-hide') {
        TweenMax.set(element, {height: 'auto', autoAlpha: 0});
        TweenMax.from(element, 0.5, {ease: Circ.easeOut, height: 0, onComplete: done});
        TweenMax.to(element, 1, {delay: 0.5, autoAlpha: 1});
      }
    }
  };
}

export function fadeInOnNgShow():any{
  return {
    removeClass: function (element, className, done) {
      if(className === 'ng-hide'){
        TweenMax.set(element, {autoAlpha: 0, scale: 1});
        TweenMax.to(element, 0.5,
          {ease: Circ.easeOut, autoAlpha: 1, onComplete: done});
      }
    }
  };
}

export function editIcons():any{
  return{
    removeClass: function(element,className,done){

      if(className === 'ng-hide'){
        TweenMax.set(element, {autoAlpha: 0, right:-50});

        TweenMax.to(element, 0.5, {
          right:50,
          ease: Circ.easeOut,
          autoAlpha: 1,
          onComplete: done});
      }
    },
    addClass: function(element,className,done){
      if(className === 'ng-hide'){
        TweenMax.to(element, 0.5, {
          ease: Circ.easeOut,
          autoAlpha: 0,
          onComplete: done});
      }
    }
  }
}
export function simpleFade():any{
  return{
    removeClass: function(element,className,done){
      if(className === 'ng-hide'){
        TweenMax.to(element, 0.5, {
          ease: Circ.easeOut,
          left:0,
          rotation:0,
          autoAlpha: 1,
          onComplete: done});
      }
    },
    addClass: function(element,className,done){
      if(className === 'ng-hide'){
        TweenMax.to(element, 0.5, {
          ease: Circ.easeOut,
          autoAlpha: 0,
          rotation:360,
          left:50,
          onComplete: done});
      }
    }
  }
}
