import IComponentOptions = angular.IComponentOptions;
import {Milestone} from "../../../core/models/milestone";

export class MilestoneItemComponent implements IComponentOptions {
  static NAME: string = "milestoneItem";
  controller: any = MilestoneItemController;
  template: string = require("./MilestoneItem-template.html");
  bindings: any = {
    milestone: "<",
    onSelected: "&"
  };
}

export class MilestoneItemController {
  milestone: Milestone;
  onSelected: Function;
  gotoMilestoneDetail(): void {
    this.onSelected({milestone: this.milestone});
  }
}
