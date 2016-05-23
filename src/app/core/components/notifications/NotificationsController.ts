import IRootScopeService = angular.IRootScopeService;
import IAngularEvent = angular.IAngularEvent;
import ISCEService = angular.ISCEService;
import IScope = angular.IScope;
var $ = require('jquery');

interface ButtonConfig {
  title:string;
  icon:string;
}

export class NotificationsController {
  public buttons:Array<ButtonConfig> = [];
  originatorEv:any;

  static $inject:Array<string> = [

  ];

  constructor() {
    this.buttons = this.getButtons();
  }

  private getButtons():Array<ButtonConfig> {
    var btns:Array<ButtonConfig> = [];

    btns.push(this.createButtonConfig('notifications', 'social:notifications'));

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

  private goToNotification():void {
    
  }
} 
