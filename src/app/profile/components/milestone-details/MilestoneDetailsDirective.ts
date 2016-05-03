import IDirective = angular.IDirective;
import IDirectiveLinkFn = angular.IDirectiveLinkFn;
import IScope = angular.IScope;
import IAugmentedJQuery = angular.IAugmentedJQuery;
import IAnimateService = angular.animate.IAnimateService;
import IAttributes = angular.IAttributes;
import IControllerService = angular.IControllerService;
import IAnimationOptions = angular.animate.IAnimationOptions;
require('./milestone-details.scss');
import {MilestoneDetailsController} from "./MilestoneDetailsController";
var $ = require('jquery');


export class MilestoneDirective implements IDirective {

  static NAME:string = "milestone-details";
  static CONTROLLER_AS:string = 'milestone-details';

  scope:any = {};
  restrict:string = 'E';
  controller:Function = MilestoneDetailsController;
  controllerAs:string = MilestoneDirective.CONTROLLER_AS;
  template:string = require('./milestone-details.html');
  link:IDirectiveLinkFn = (scope:IScope, el:IAugmentedJQuery, attr:IAttributes, ctrl:MilestoneDetailsController)=> {
    
  };

  constructor() {
  }
}
