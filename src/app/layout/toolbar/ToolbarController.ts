import IAngularEvent = angular.IAngularEvent;
import {SessionService, ISessionService} from "../../auth/service/SessionService";
import {Navigator} from "../../core/services/Navigator";
interface ButtonConfig {
  title: string;
  icon: string;
}
export class ToolbarController {
  public buttons: Array<ButtonConfig> = [];

  originatorEv: any;

  static $inject: string[] = [Navigator.NAME, SessionService.NAME];

  constructor(private navigator: Navigator, private sessionService: ISessionService) {
    this.buttons = this.getButtons();
  }

  public goToProfile(): void {
    this.navigator.goToUserProfile(this.sessionService.getUsername());
  }

  private getButtons(): Array<ButtonConfig> {
    var btns: Array<ButtonConfig> = [];

    btns.push(this.createButtonConfig("person", "social:person"));
    btns.push(this.createButtonConfig("email", "com:email"));
    btns.push(this.createButtonConfig("logout", "mdi:logout"));

    return btns;
  }

  private createButtonConfig(_title: string, _icon: string): ButtonConfig {
    return {
      title: _title,
      icon: _icon
    };
  }

  public openMenu($mdOpenMenu: any, ev: IAngularEvent): void {
    this.originatorEv = ev;
    $mdOpenMenu(ev);
  }
}
