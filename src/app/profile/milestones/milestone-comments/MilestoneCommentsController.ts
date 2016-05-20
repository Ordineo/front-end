import IScope = angular.IScope;
import {MilestoneService} from "../../services/MilestoneService";
import {SessionService} from "../../../auth/service/SessionService";
var $ = require("jquery");

export class MilestoneCommentsController {
  public comments: any = [];
  public username: string = "";
  public commentFieldData: string = "";
  public milestone: string = "";

  static $inject: Array<string> = [
    MilestoneService.NAME,
    SessionService.NAME,
    "$scope",
    "moment"
  ];

  constructor(private milestoneService: MilestoneService,
              private sessionService: SessionService,
              private scope: IScope,
              private moment: any) {
    this.username = this.sessionService.getUsername();
  }

  $onInit(): void {
    this.milestoneService.subscribeOnMilestoneSelected(this.scope, this.updateViewModel());
    var selectedMilestone: any = this.milestoneService.getSelectedMilestone();
    if (selectedMilestone !== undefined) {
      this.setViewModel(selectedMilestone);
    }
  }

  updateViewModel(): () => any {
    return () => {
      this.setViewModel(this.milestoneService.getSelectedMilestone());
    };
  }

  setViewModel(selectedMilestone: any): void {
    if (selectedMilestone) {
      var milestone = selectedMilestone._links.self.href;
      var index = milestone.indexOf("milestones");
      this.milestone = milestone.substring(index);
      this.getComments(this.milestone);
    }
  }

  public getComments(milestone: any): void {
    this.comments = [];
    this.milestoneService.getCommentsByMilestone(milestone)
      .then((data: any) => {
        for (var i = 0; i < data._embedded.comments.length; i++) {
          this.comments.push(data._embedded.comments[i]);
        }
      });
  }

  public addComment(): void {
    if (this.commentFieldData.trim() !== "") {
      this.milestoneService.createCommentByMilestone(
        this.username,
        this.moment().format("YYYY-MM-DDThh:mm:ss"),
        this.commentFieldData,
        this.milestone
      ).then((success: any) => {
        this.getComments(this.milestone);
      });
      $("#commentField").blur();
      this.commentFieldData = "";
    }
  }
} 
