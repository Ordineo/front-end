import IComponentOptions = angular.IComponentOptions;
import {MilestoneCommentsController} from "./MilestoneCommentsController";
require("./milestone-comments.scss");

export class MilestoneCommentsComponent implements IComponentOptions {
  static NAME: string = "milestoneComments";
  static CONTROLLER_AS: string = "milestoneComments";

  controller: Function = MilestoneCommentsController;
  controllerAs: string = MilestoneCommentsComponent.CONTROLLER_AS;
  template: string = require("./milestone-comments.html");
  bindings: any = {
    onContentLoaded: "&"
  };
}
