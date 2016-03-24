
import IRootScopeService = angular.IRootScopeService;
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
  static EVENT_USERNAME = "onUserNameSet";

  constructor(private $rootScope:IRootScopeService){
    this.buttons = this.getButtons();
    $rootScope.$on(ToolbarController.EVENT_USERNAME,(event, args)=>{
      console.log(args);
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
