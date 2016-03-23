var $ = require('jquery');

require('./linkedin.scss');

import IDirective = angular.IDirective;
import {LinkedInController} from "./LinkedInController";
import IScope = angular.IScope;
import IAugmentedJQuery = angular.IAugmentedJQuery;
import IAttributes = angular.IAttributes;
export class LinkedInDirective implements IDirective{

  static NAME:string = "linkedin";

  template:string = require('./linkedin.html');
  controller:Function = LinkedInController;
  controllerAs:string = '$ctrl';
  link:angular.IDirectiveLinkFn = (scope:IScope, el:IAugmentedJQuery, attrs:IAttributes)=>{
    scope.$on(LinkedInController.EVENT_AUTH, ()=> {
      var find = $(el).find('.btn-linkedin');
      find.click();
    });
  };

  static instance():IDirective{
    return new LinkedInDirective();
  }
}

