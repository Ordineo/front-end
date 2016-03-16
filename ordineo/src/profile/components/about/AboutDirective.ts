import IDirective = angular.IDirective;
import {AboutDirectiveController} from "./AboutDirectiveController";
import IDirectiveLinkFn = angular.IDirectiveLinkFn;
import IScope = angular.IScope;
import IAugmentedJQuery = angular.IAugmentedJQuery;

import IAnimateService = angular.animate.IAnimateService;
require('./about-directive-styles.scss');

/**
 * @ngdoc directive
 * @name profileAbout
 * @module ordineo.profile
 *
 * @restrict E
 *
 * @usage
 * <profile-about username="john"></profile-about>
 *
 * or
 *
 * <profile-about
 *        functie="designer"
 *        unit="clockwork">
 *     <p>description of the person</p>
 * </profile-about>
 */
export class AboutDirective implements IDirective {

  static NAME:string = "profileAbout";

  scope:any = {};
  restrict:string = 'E';
  transclude:boolean = true;
  bindToController:any = {
    title: '@',
    username: '@',
    functie: '=?',
    unit:'=?',
    description: '=?',
  };
  controller:Function = AboutDirectiveController;
  controllerAs:string = '$ctrl';
  template:string = require('./about-directive-template.html');
  link:IDirectiveLinkFn = (scope:IScope, el:IAugmentedJQuery)=> {
    scope.$watch('$ctrl.isContentLoaded', (newValue, oldValue)=> {
      if(newValue === true) {

      }
    });
  };

  constructor(private animate:IAnimateService){
  }

  static instance():any{
    const directive = (ani:IAnimateService)=>new AboutDirective(ani);
    directive.$inject = ['$animate'];
    return directive;
  }
}
