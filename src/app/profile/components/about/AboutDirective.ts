import IDirective = angular.IDirective;
import {AboutDirectiveController} from "./AboutDirectiveController";
import IDirectiveLinkFn = angular.IDirectiveLinkFn;
import IScope = angular.IScope;
import IAugmentedJQuery = angular.IAugmentedJQuery;

import IAnimateService = angular.animate.IAnimateService;
import IAttributes = angular.IAttributes;
import IControllerService = angular.IControllerService;
import IAnimationOptions = angular.animate.IAnimationOptions;
require('./about-directive-styles.scss');
var $ = require('jquery');

/**
 * @ngdoc directive
 * @name profileAbout
 * @module ordineo.profile
 *
 * @restrict E
 *
 * @usage
 * <profile-about username="john"></profile-about>
 */
export class AboutDirective implements IDirective {

  static NAME:string = "profileAbout";
  static CONTROLLER_AS:string = 'about';

  scope:any = {};
  restrict:string = 'E';
  bindToController:any = {
    username: '@'
  };
  controller:Function = AboutDirectiveController;
  controllerAs:string = AboutDirective.CONTROLLER_AS;
  template:string = require('./about-directive-template.html');
  link:IDirectiveLinkFn = (scope:IScope, el:IAugmentedJQuery, attr:IAttributes, ctrl:AboutDirectiveController)=> {
    scope.$watch('about.isCollapsed', (newValue, oldValue)=> {
      if (ctrl.isContentLoaded) {
        var any = $(el).find('.about-content');
        ctrl.height = any.height();
        $(any).attr('sup', ctrl.height);
        newValue ?
          this.animate.removeClass($(el).find('.about-content'), 'flow-height')
          : this.animate.addClass($(el).find('.about-content'), 'flow-height');
      }
    });

    scope.$watch('about.isEditModeEnabled', (newValeu)=> {
      var any = $(el).find('.about-content');
      ctrl.height = any.height();
      $(any).attr('sup', ctrl.height);
      // newValeu ?
      //   this.animate.removeClass($(el).find('.about-content')[0], 'flow-height')
      //   : this.animate.addClass($(el).find('.about-content')[0], 'flow-height');
    });
  };

  constructor(private animate:IAnimateService) {
  }

  static instance():any {
    const directive = (ani:IAnimateService)=>new AboutDirective(ani);
    directive.$inject = ['$animate'];
    return directive;
  }
}
