import IComponentOptions = angular.IComponentOptions;
import {Milestone} from "../../../core/models/milestone";
export class TimelineComponent implements IComponentOptions {  
  static NAME:string = "timeline";
  controller:any = TimelineController;
  template:string = require('./TimelineComponent-template.html');
  bindings:any = {
    username: '@'
  };
}

export class TimelineController {
  public title:string = "Timeline";
  public milestones:Milestone[];
}
