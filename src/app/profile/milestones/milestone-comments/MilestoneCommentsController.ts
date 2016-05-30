import IScope = angular.IScope;
import {MilestoneService} from "../../services/MilestoneService";
import {SessionService} from "../../../auth/service/SessionService";
import {Milestone} from "../../../core/models/milestone";
var $ = require("jquery");

export class MilestoneCommentsController {
  public comments: any = [];
  public commentsLoaded: boolean = false;
  public username: string = "";
  public commentFieldData: string = "";
  private milestoneLink: string = "";
  private commentsLink: string = "";

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
    var selectedMilestone: Milestone = this.milestoneService.getSelectedMilestone();
    if (selectedMilestone !== undefined) {
      this.setViewModel(selectedMilestone);
    }
  }

  updateViewModel(): () => any {
    return () => {
      this.setViewModel(this.milestoneService.getSelectedMilestone());
    };
  }

  setViewModel(selectedMilestone: Milestone): void {
    if (selectedMilestone) {
      this.milestoneLink = selectedMilestone["_links"].self.href;
      this.commentsLink = selectedMilestone["_links"].comments.href;
      this.getComments(this.commentsLink);
    }
  }

  public getComments(commentsLink: string): void {
    this.comments = [];
    this.commentsLoaded = false;
    this.milestoneService.getCommentsByMilestone(commentsLink)
      .then((data: any) => {
        for (var i = 0; i < data._embedded.comments.length; i++) {
          this.comments.push(data._embedded.comments[i]);
        }
        this.commentsLoaded = true;
      });
  }

  public addComment(): void {
    if (this.commentFieldData.trim() !== "") {
      this.milestoneService.createCommentByMilestone(
        this.username,
        this.moment().format("YYYY-MM-DDThh:mm:ss"),
        this.commentFieldData,
        this.milestoneLink
      ).then((success: any) => {
        this.getComments(this.commentsLink);
      });
      $("#commentField").blur();
      this.commentFieldData = "";
    }
  }
} 
