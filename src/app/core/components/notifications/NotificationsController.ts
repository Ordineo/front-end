// var $ = require("jquery");

import {NotificationService} from "../../services/NotificationService";
interface ButtonConfig {
  title: string;
  icon: string;
}

export class NotificationsController {
  public buttons: Array<ButtonConfig> = [];
  originatorEv: any;

  static $inject: Array<string> = [
    NotificationService.NAME
  ];

  constructor(private notificationService: NotificationService) {
    this.buttons = this.getButtons();
    this.getNotifications();
  }

  private getButtons(): Array<ButtonConfig> {
    var btns: Array<ButtonConfig> = [];

    btns.push(this.createButtonConfig("notifications", "social:notifications"));

    return btns;
  }

  private createButtonConfig(_title: string, _icon: string): ButtonConfig {
    return {
      title: _title,
      icon: _icon
    };
  }

  public openMenu($mdOpenMenu: any, ev: any): void {
    this.originatorEv = ev;
    $mdOpenMenu(ev);
  }

  private getNotifications(): void {
    this.notificationService.getNotifications()
      .then((success: any) => {
        console.log(success);
      }, (error) => {
        console.log(error);
      });
  }

  // private goToNotification(): void {
  //
  // }
} 
