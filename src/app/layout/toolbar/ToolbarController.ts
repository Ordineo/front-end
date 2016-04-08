
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

  firstName:string;

  static $inject = ['$rootScope'];

  constructor(private $rootScope:IRootScopeService){
    this.buttons = this.getButtons();
    $rootScope.$on(AboutDirectiveController.EVENT_ON_EMPLOYEEDATA_SET,(event, args)=>{
      this.firstName = args.firstName;
    });
  }

  private getButtons():Array<ButtonConfig>{
    var btns:Array<ButtonConfig> = [];

    btns.push(this.createButtonConfig('public', 'social:public'));
    btns.push(this.createButtonConfig('email', 'com:email'));
    btns.push(this.createButtonConfig('today', 'act:today'));
    btns.push(this.createButtonConfig('alarm', 'act:alarm'));
    btns.push(this.createButtonConfig('perm_contact_calendar', 'act:perm_contact_calendar'));
    btns.push(this.createButtonConfig('person', 'social:person'));

    return btns;
  }

  private createButtonConfig(_title:string, _icon:string):ButtonConfig{
    return {
      title: _title,
      icon: _icon
    };
  }
}
