import IDialogOptions = angular.material.IDialogOptions;
import './milestone-edit.scss';
import IScope = angular.IScope;
import IDialogService = angular.material.IDialogService;
import {MilestoneService, IMilestoneService} from "../../services/MilestoneService";
import {Milestone} from "../../../core/models/milestone";

export class MilestoneEditDialog implements IDialogOptions {
  template:string = require('./milestone-edit.template.html');
  controller:Function = MilestoneEditDialogController;
  bindToController:boolean = true;
  controllerAs:string = '$ctrl';
}

export class MilestoneEditDialogController {
  static $inject = ['$scope', '$mdDialog', MilestoneService.NAME, 'moment'];

  milestone:Milestone;
  dueDate:any;

  constructor(private scope:IScope,
              private dialog:IDialogService,
              private milestoneService:IMilestoneService,
              private moment:any) {
    this.init();
  }

  init():void {
    var selectedMilestone:Milestone = this.milestoneService.getSelectedMilestone();
    this.milestone = selectedMilestone;
    this.dueDate = this.moment(selectedMilestone.dueDate).toDate();
  }

  cancel():void {
    this.dialog.hide();
  }

  ok():void {
    /*make request*/
    this.milestone.dueDate = this.moment(this.dueDate).format('YYYY-MM-DD');
    this.milestoneService.put(this.milestone)
      .then(()=> {
        this.dialog.hide();
        this.milestoneService.notifyMilestoneSelected();
      })
      .catch((err)=> {
        /*show error message*/
        console.log(err);
      });
  }
}
