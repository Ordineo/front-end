import IComponentOptions = angular.IComponentOptions;
export class MilestoneDetailsPageComponent implements IComponentOptions {
  static NAME:string = "milestoneDetailsPage";

  template:string = require('./milestone-details-page-template.html');
}
