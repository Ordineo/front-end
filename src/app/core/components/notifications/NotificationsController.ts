import {NotificationService} from "../../services/NotificationService";
// var $ = require("jquery");

interface ButtonConfig {
  title: string;
  icon: string;
}

export class NotificationsController {
  public buttons: Array<ButtonConfig> = [];
  originatorEv: any;
  public notifications: any = [];

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
    this.notifications = [];
    this.notificationService.getNotifications()
      .then((data: any) => {
        for (var i = 0; i < data.data._embedded.messages.length; i++) {
          this.notifications.push(data.data._embedded.messages[i]);
        }
      });
  }

  // private goToNotification(): void {
  //
  // }
} 
