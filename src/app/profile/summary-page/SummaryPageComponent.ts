import IComponentOptions = angular.IComponentOptions;
export class SummaryPageComponent implements IComponentOptions {
  static NAME:string = "summaryPage";

  template:string = require('./summary-page-template.html');
}

