import IComponentOptions = angular.IComponentOptions;
import {MilestoneDetailsController} from "./MilestoneDetailsController";
import IScope = angular.IScope;
import IAngularEvent = angular.IAngularEvent;

export class MilestoneDetailsComponent implements IComponentOptions {
  static NAME:string = "milestoneDetails";
  controller:any = MilestoneDetailsController;
  template:string = require('./milestone-details.html');
  bindings:any = {
    onContentLoaded: '&'
  };
}
