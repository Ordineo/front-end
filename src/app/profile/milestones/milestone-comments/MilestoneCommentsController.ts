import IRootScopeService = angular.IRootScopeService;
import IAngularEvent = angular.IAngularEvent;
import ISCEService = angular.ISCEService;
import IScope = angular.IScope;
import {MilestoneService} from "../../services/MilestoneService";
import {SessionService} from "../../../auth/service/SessionService";
var $ = require('jquery');

export class MilestoneCommentsController {
  public comments:any = [];
  public username:string = "";
  public timestamp:string = "";
  public commentFieldData:string = "";

  static $inject:Array<string> = [
    MilestoneService.NAME,
    SessionService.NAME
  ];

  constructor(private milestoneService:MilestoneService, private sessionService:SessionService) {
    this.username = this.sessionService.getUsername();
    this.getComments();
  }

  public getComments():void {
    this.comments = [];
    this.milestoneService.getCommentsByMilestone()
      .then((data:any) => {
        for (var i = 0; i < data._embedded.comments.length; i++) {
          this.comments.push(data._embedded.comments[i]);
        }
      }, (error:any) => {
    });
  }

  public addComment():void {
    if (this.commentFieldData.trim() !== '') {
      this.setTimestamp();

      this.milestoneService.createCommentByMilestone(this.username, this.timestamp, this.commentFieldData)
        .then((success:any) => {
          this.getComments();
        }, (error:any) => {
        });

      $('#commentField').blur();
      this.commentFieldData = "";
    }
  }

  public setTimestamp():void {
    var year = "" + new Date().getFullYear();
    var month = "" + (new Date().getMonth() + 1);
    var day = "" + new Date().getDate();
    var hour = "" + new Date().getHours();
    var minute = "" + new Date().getMinutes();
    var second = "" + new Date().getSeconds();

    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    if (hour.length < 2) {
      hour = "0" + hour;
    }
    if (minute.length < 2) {
      minute = "0" + minute;
    }
    if (second.length < 2) {
      second = "0" + second;
    }

    this.timestamp = year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second;
  }
} 
