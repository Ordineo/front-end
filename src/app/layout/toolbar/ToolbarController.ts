
import IRootScopeService = angular.IRootScopeService;
import {AboutDirectiveController} from "../../profile/components/about/AboutDirectiveController";
export interface IToolbarScope{
  buttons:Array<ButtonConfig>;
}
interface ButtonConfig{
  title:string;
  icon:string;
}
export class ToolbarController implements IToolbarScope{
  public buttons:Array<ButtonConfig> = [];
  originatorEv:any;

  firstName:string;
  lastName:string;

  static $inject = ['$rootScope'];

  constructor(private $rootScope:IRootScopeService){
    this.buttons = this.getButtons();
    $rootScope.$on(AboutDirectiveController.EVENT_ON_EMPLOYEEDATA_SET,(event, args)=>{
      this.firstName = args.firstName;
      this.lastName = args.lastName;
    });
  }

  private getButtons():Array<ButtonConfig>{
    var btns:Array<ButtonConfig> = [];

    btns.push(this.createButtonConfig('person', 'social:person'));
    btns.push(this.createButtonConfig('email', 'com:email'));
    btns.push(this.createButtonConfig('logout', 'mdi:logout'));

    return btns;
  }

  private createButtonConfig(_title:string, _icon:string):ButtonConfig{
    return {
      title: _title,
      icon: _icon
    };
  }

  private openMenu($mdOpenMenu, ev) {
    this.originatorEv = ev;
    $mdOpenMenu(ev);
  }
}
