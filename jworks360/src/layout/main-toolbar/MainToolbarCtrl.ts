import {IStateService} from "angular-ui-router";
import {LoginState} from "../../core/route/states/login/login.state";
export class MainToolbarCtrl {

  static $inject:Array<string> = ['$state'];
  public user:any = {
    name: 'Ryan'
  };
  public hidden:boolean = false;
  public isOpen:boolean = false;
  public hover:boolean = true;

  public items:Array<any> = [
    { name: "Profile", icon: "social:person", direction: "bottom" },
    { name: "Inbox", icon: "content:inbox", direction: "top" },
    { name: "Logout", icon: "nav:arrow_back", direction: "bottom"}
  ];

  constructor(private $state:IStateService){
  }

  public onLogoutClick():void{
    this.$state.go(LoginState.NAME);
  }
}
