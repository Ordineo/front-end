import IRootScopeService = angular.IRootScopeService;
import {EmployeeName} from "../../core/models/EmployeeName";
interface ButtonConfig {
  title:string;
  icon:string;
}
export class ToolbarController {
  public buttons:Array<ButtonConfig> = [];
  public employeeName:EmployeeName;

  originatorEv:any;

  constructor() {
    this.buttons = this.getButtons();
  }

  private getButtons():Array<ButtonConfig> {
    var btns:Array<ButtonConfig> = [];

    btns.push(this.createButtonConfig('person', 'social:person'));
    btns.push(this.createButtonConfig('email', 'com:email'));
    btns.push(this.createButtonConfig('logout', 'mdi:logout'));

    return btns;
  }

  private createButtonConfig(_title:string, _icon:string):ButtonConfig {
    return {
      title: _title,
      icon: _icon
    };
  }

  public openMenu($mdOpenMenu, ev) {
    this.originatorEv = ev;
    $mdOpenMenu(ev);
  }
}
