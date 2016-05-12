import IComponentOptions = angular.IComponentOptions;
import {Milestone} from "../../core/models/milestone";
import {ProfileService} from "../services/ProfileService";
import {MilestoneService} from "../services/MilestoneService";
require('./milestone-details-page-styles.scss');
export class MilestoneDetailsPageComponent implements IComponentOptions {
  static NAME:string = "milestoneDetailsPage";

  controller:any = MilestoneDetailsPageController;

  template:string = require('./milestone-details-page-template.html');
}

export class MilestoneDetailsPageController {
  public title:string = "Milestone list";
  public milestones:Milestone[];
  public username:string;
  public milestonesLoaded:boolean;

  static $inject = [ProfileService.NAME, MilestoneService.NAME];

  constructor(private profileService:ProfileService,
              private milestoneService:MilestoneService) {
  }

  $onInit():void {
    this.username = this.profileService.username;
    this.getMilestoneDataAsync();
  }

  getMilestoneDataAsync():void {
    this.milestonesLoaded = false;
    this.milestoneService.getMilestonesByUsername(this.username)
      .then((milestones:Milestone[])=> {
          this.milestones = milestones;
          this.milestonesLoaded = true;
        }, (onError)=> {
          console.log(onError);
        }
      );
  }
}
