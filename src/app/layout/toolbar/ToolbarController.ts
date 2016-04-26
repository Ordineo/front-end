import IRootScopeService = angular.IRootScopeService;
export interface IToolbarScope {
  buttons:Array<ButtonConfig>;
}
interface ButtonConfig {
  title:string;
  icon:string;
}
export class ToolbarController implements IToolbarScope {
  public buttons:Array<ButtonConfig> = [];
  originatorEv:any;
  firstName:string;
  lastName:string;

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
