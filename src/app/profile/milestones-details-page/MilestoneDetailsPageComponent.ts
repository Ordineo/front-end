import IComponentOptions = angular.IComponentOptions;
export class MilestoneDetailsPageComponent implements IComponentOptions {
  static NAME:string = "milestoneDetailsPage";

  template:string = require('./milestone-details-page-template.html');
  controller:Function = MilestoneDetailsPageComponentController;
}
export class MilestoneDetailsPageComponentController {
  public selectedId:string;
  public isEmpty:boolean;

  $routerOnActivate(next:any):void {
    if (next.params.id !== undefined) {
      this.selectedId = next.params.id;
      this.isEmpty = false;
    } else {
      //  empty view
      this.isEmpty = true;
    }
  }
}
