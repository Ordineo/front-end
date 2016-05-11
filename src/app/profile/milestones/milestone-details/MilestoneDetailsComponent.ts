import IComponentOptions = angular.IComponentOptions;
import {MilestoneDetailsController} from "./MilestoneDetailsController";
import IScope = angular.IScope;
import IAngularEvent = angular.IAngularEvent;
require('./milestone-details.scss');

export class MilestoneDetailsComponent implements IComponentOptions {
  static NAME:string = "milestoneDetails";
  static CONTROLLER_AS:string = 'milestoneDetails';

  controller:Function = MilestoneDetailsController;
  controllerAs:string = MilestoneDetailsComponent.CONTROLLER_AS;
  template:string = require('./milestone-details.html');
  bindings:any = {
    onContentLoaded: '&'
  };
}
