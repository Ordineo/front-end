import IRootScopeService = angular.IRootScopeService;
import {EmployeeName} from "../../core/models/EmployeeName";
import {Navigator, INavigator} from "../../core/services/Navigator";
import {SessionService, ISessionService} from "../../auth/service/SessionService";
interface ButtonConfig {
  title:string;
  icon:string;
}
export class ToolbarController {
  public buttons:Array<ButtonConfig> = [];
  public employeeName:EmployeeName;

  originatorEv:any;

  static $inject = [Navigator.NAME, SessionService.NAME];

  constructor(private navigator:INavigator, private sessionService:ISessionService) {
    this.buttons = this.getButtons();
  }

  public goToProfile():void {
    this.navigator.goToUserProfile(this.sessionService.getUsername());
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
