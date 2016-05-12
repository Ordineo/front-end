import IComponentOptions = angular.IComponentOptions;
import {Milestone} from "../../../core/models/milestone";
import {MilestoneService} from "../../services/MilestoneService";
import IScope = angular.IScope;
import IAngularEvent = angular.IAngularEvent;
import {ProfileService} from "../../services/ProfileService";

export class TimelineComponent implements IComponentOptions {
  static NAME:string = "timeline";
  controller:any = TimelineController;
  template:string = require('./TimelineComponent-template.html');
  bindings:any = {
    onContentLoaded: '&'
  };
}

export class TimelineController {
  public title:string = "Timeline";
  public milestones:Milestone[];
  public username:string;
  public onContentLoaded:Function;

  static $inject = [
    ProfileService.NAME,
    '$scope',
    MilestoneService.NAME];

  constructor(private profileService:ProfileService,
              private $scope:IScope,
              private milestoneService:MilestoneService) {
  }

  $onInit():void {
    this.username = this.profileService.username;
    this.profileService.subscribeUsernameChanged(this.$scope, (evt:IAngularEvent, data:any)=> {
      this.username = data.username;
      this.getMilestoneDataAsync();
    });
    if (this.username) {
      this.getMilestoneDataAsync();
    } else {
      this.onContentLoaded({isLoaded: true});
    }
  }

  onMilestoneDetailsClick($locals:any):void {
    var milestone:Milestone = $locals.milestone;
    this.navigator.goToMilestoneDetails(this.username, milestone);
  }

  getMilestoneDataAsync():void {
    this.onContentLoaded({isLoaded: false});
    this.milestoneService.getMilestonesByUsername(this.username)
      .then((milestones:Milestone[])=> {
          this.milestones = milestones;
          this.onContentLoaded({isLoaded: true});
        }, (onError)=> {
          console.log(onError);
        }
      );
  }
}
