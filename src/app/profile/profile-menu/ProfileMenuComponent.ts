import IComponentOptions = angular.IComponentOptions;
export class ProfileMenuComponent implements IComponentOptions {
  static NAME:string = "profileMenu";

  controller:Function = ProfileMenuComponentController;
  template:string = require('./profile-menu-template.html');
}
export class ProfileMenuComponentController {
  public tabs:any = [
    {
      label: "Summary",
    }, {
      label: "Milestones"
    }
  ]
}
