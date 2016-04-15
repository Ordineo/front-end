import IComponentOptions = angular.IComponentOptions;
import {Milestone} from "../../../core/models/milestone";
import {MilestoneService} from "../../services/MilestoneService";
import IScope = angular.IScope;
import {HeaderController} from "../../../layout/header/HeaderController";
import IAngularEvent = angular.IAngularEvent;

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

  static $inject = [MilestoneService.NAME, '$rootScope'];

  constructor(private timelineService:MilestoneService, private rootScope:IScope) {

  }

  $onInit():void {
    this.isContentLoaded = false;
    this.rootScope.$on(HeaderController.EVENT_USER_SELECTED, (evt:IAngularEvent, data:any)=> {
      this.username = data.username;
      this.getMilestoneDataAsync();
    });
    console.log(this.username);
    if (this.username) {
      this.getMilestoneDataAsync();
    } else {
      this.isContentLoaded = true;
    }
  }

  getMilestoneDataAsync():void {
    this.isContentLoaded = false;
    this.timelineService.getMilestonesByUsername(this.username)
      .then((milestones:Milestone[])=> {
          this.milestones = milestones;
          this.isContentLoaded = true;
        }, (onError)=> {
          console.log(onError);
        }
      );
  }
}
