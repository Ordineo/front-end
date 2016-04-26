import IComponentOptions = angular.IComponentOptions;
import {Milestone} from "../../../core/models/milestone";
import {MilestoneService} from "../../services/MilestoneService";
import IScope = angular.IScope;
import IAngularEvent = angular.IAngularEvent;

export class TimelineComponent implements IComponentOptions {
  static NAME:string = "timeline";
  controller:any = TimelineController;
  template:string = require('./TimelineComponent-template.html');
  bindings:any = {
    username: '@',
    onContentLoaded: '&'
  };
}

export class TimelineController {
  public title:string = "Timeline";
  public milestones:Milestone[];
  public username:string;
  public onContentLoaded:Function;

  static $inject = [MilestoneService.NAME, '$rootScope'];

  constructor(private timelineService:MilestoneService, private rootScope:IScope) {

  }

  $onInit():void {
    // this.rootScope.$on(HeaderController.EVENT_USER_SELECTED, (evt:IAngularEvent, data:any)=> {
    //   this.username = data.username;
    //   this.getMilestoneDataAsync();
    // });
    if (this.username) {
      this.getMilestoneDataAsync();
    } else {
      this.onContentLoaded({isLoaded: true});
    }
  }

  getMilestoneDataAsync():void {
    this.onContentLoaded({isLoaded: false});
    this.timelineService.getMilestonesByUsername(this.username)
      .then((milestones:Milestone[])=> {
          this.milestones = milestones;
          this.onContentLoaded({isLoaded: true});
        }, (onError)=> {
          console.log(onError);
        }
      );
  }
}
