import IComponentOptions = angular.IComponentOptions;
export class SummaryPageComponent implements IComponentOptions {
  static NAME:string = "summaryPage";

  template:string =
    `
      <profile-about></profile-about>
      <milestone-container id="milestone-container"></milestone-container>
    `;
}

