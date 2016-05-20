import IComponentOptions = angular.IComponentOptions;
import {Milestone} from "../../core/models/milestone";
import {ProfileService} from "../services/ProfileService";
import {MilestoneService} from "../services/MilestoneService";
require("./milestone-details-page-styles.scss");
export class MilestoneDetailsPageComponent implements IComponentOptions {
  static NAME: string = "milestoneDetailsPage";

  template: string = require("./milestone-details-page-template.html");
  controller: Function = MilestoneDetailsPageController;
}
export class MilestoneDetailsPageController {

  public title: string = "Milestones";
  public milestones: Milestone[];
  public selectedMilestone: Milestone;
  public username: string;
  public milestonesLoaded: boolean;

  static $inject:string[] = [ProfileService.NAME, MilestoneService.NAME];

  constructor(private profileService: ProfileService,
              private milestoneService: MilestoneService) {
  }

  $routerOnActivate(): void {
    this.selectedMilestone = this.milestoneService.getSelectedMilestone();
    this.username = this.profileService.username;
    this.getListOfMilestones();
  }

  onMilestoneSelected($locals: any): void {
    var milestone: Milestone = $locals.milestone;
    this.milestoneService.setSelectedMilestone(milestone);
    this.selectedMilestone = milestone;
  }

  getListOfMilestones(): void {
    this.milestonesLoaded = false;
    this.milestoneService.getMilestonesByUsername(this.username)
      .then((milestones: Milestone[]) => {
          this.selectedMilestone = this.milestoneService.getSelectedMilestone();
          this.milestones = milestones;
          this.milestonesLoaded = true;
        }, (onError) => {
          console.log(onError);
        }
      );
  }
}
