import IDialogOptions = angular.material.IDialogOptions;
import "./milestone-edit.scss";
import IDialogService = angular.material.IDialogService;
import {MilestoneService, IMilestoneService} from "../../services/MilestoneService";
import {Milestone} from "../../../core/models/milestone";
import IToastService = angular.material.IToastService;

export class MilestoneEditDialog implements IDialogOptions {
  template: string = require("./milestone-edit.template.html");
  controller: Function = MilestoneEditDialogController;
  bindToController: boolean = true;
  controllerAs: string = "$ctrl";
}

export class MilestoneEditDialogController {
  static $inject: string[] = ["$scope", "$mdDialog", MilestoneService.NAME, "moment", "$mdToast"];

  milestone: Milestone;
  dueDate: Date;
  minDate: Date;
  endDate: Date;
  isAccomplished: boolean;

  constructor(private dialog: IDialogService,
              private milestoneService: IMilestoneService,
              private moment: any,
              private toast: IToastService) {
    this.init();
  }

  init(): void {
    var selectedMilestone: Milestone = this.milestoneService.getSelectedMilestone();
    this.milestone = selectedMilestone;
    this.dueDate = this.moment(selectedMilestone.dueDate).toDate();
    this.minDate = this.moment(selectedMilestone.createDate).toDate();
    this.isAccomplished = this.milestone.endDate !== null;
  }

  cancel(): void {
    this.dialog.hide();
  }

  ok(): void {
    if (this.isAccomplished) {
      this.milestone.endDate = this.moment(this.endDate).format("YYYY-MM-DD");
    } else {
      this.milestone.endDate = null;
    }
    this.milestone.dueDate = this.moment(this.dueDate).format("YYYY-MM-DD");
    this.milestoneService.put(this.milestone)
      .then(() => {
        this.dialog.hide();
        this.milestoneService.notifyMilestoneSelected();
      })
      .catch((err: any) => {
        /*show error message*/
        this.toast.show(this.toast.simple().textContent("Could not update milestone"));
      });
  }
}
