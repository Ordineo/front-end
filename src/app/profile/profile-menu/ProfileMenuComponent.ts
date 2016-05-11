import IComponentOptions = angular.IComponentOptions;
import {ProfileRoutes} from "../ProfileRoutes";
export class ProfileMenuComponent implements IComponentOptions {
  static NAME:string = "profileMenu";

  bindings:any = {
    onTabSelected: '&'
  };
  controller:Function = ProfileMenuComponentController;
  template:string = require('./profile-menu-template.html');
}
export class ProfileMenuComponentController {
  public onTabSelected:Function;
  public tabs:ProfileMenuTab[] = [
    {
      label: "Summary",
      route: ProfileRoutes.SUMMARY
    }, {
      label: "Milestones",
      route: ProfileRoutes.MILESTONES
    }
  ];

  public onSelected(tab:ProfileMenuTab):void {
    this.onTabSelected({selectedTab: tab});
  }
}
export interface ProfileMenuTab {
  label:string;
  route:string;
}
