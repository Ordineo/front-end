import ComponentDefinition = angular.ComponentDefinition;
import IComponentOptions = angular.IComponentOptions;
import {Milestone} from "../../../core/models/milestone";
// require('./milestone-styles.scss');

export class MilestoneComponent implements IComponentOptions {
  static NAME:string = "milestone";
  controller:any = MilestoneController;
  template:string = require('./MilestoneComponent-template.html');
  bindings:any = {
    milestone: '<'
  };
}

export class MilestoneController {
  milestone:Milestone;
}
