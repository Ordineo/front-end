import IComponentOptions = angular.IComponentOptions;
import {ProfileRoutes} from "../ProfileRoutes";
import {ProfileMenuState} from "./ProfileMenuState";
import IScope = angular.IScope;
import {SummaryTab} from "./tabs/SummaryTab";
import {MilestonesTab} from "./tabs/MilestonesTab";
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
  public tabs:ProfileMenuTab[];

  static $inject = [
    ProfileMenuState.NAME,
    '$scope'
  ];

  constructor(private profileMenuState:ProfileMenuState, private scope:IScope) {
    this.tabs = [
      new SummaryTab(),
      new MilestonesTab()
    ];
  }

  $onInit():void {
    this.profileMenuState.subscribe(this.scope, (event, data)=> {
      this.setTabActive(data.tabName);
    });
  }

  public setTabActive(name:string) {
    for (var i:number = 0; i < this.tabs.length; i++) {
      var tab:ProfileMenuTab = this.tabs[i];
      tab.isActive = tab.label === name;
    }
  }

  public onSelected(tab:ProfileMenuTab):void {
    this.setTabActive(tab.label);
    this.onTabSelected({selectedTab: tab});
  }
}
export interface ProfileMenuTab {
  label:string;
  route:string;
  isActive:boolean;
}
