import IComponentOptions = angular.IComponentOptions;
import {Milestone} from "../../../core/models/milestone";
import {TimelineService} from "../../services/TimelineService";
require('./timeline-styles.scss');

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
  public username:string;
  public isContentLoaded:boolean;

  static $inject = [TimelineService.NAME];

  constructor(private timelineService:TimelineService) {

  }

  $onInit():void {
    this.isContentLoaded = false;
    this.timelineService.getTimelineByUsername(this.username)
      .then((milestones:Milestone[])=>{
        this.milestones = milestones;
        this.isContentLoaded = true;
      },(onError)=>{
        console.log(onError);
      });
  }
}
