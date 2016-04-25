import {ProfileService} from "../../profile/services/ProfileService";
import {Employee} from "../../core/models/employee";
import IRootScopeService = angular.IRootScopeService;
import IObservable = Rx.IObservable;
import {AboutDirectiveController} from "../../profile/components/about/AboutDirectiveController";
export interface User{
  value:string;
  display:string;
}
export interface IToolbarScope{
  users:Array<User>;
  buttons:Array<ButtonConfig>;
}
interface ButtonConfig{
  title:string;
  icon:string;
}
export class ToolbarController implements IToolbarScope{
  public users:Array<User>;
  public buttons:Array<ButtonConfig> = [];
  originatorEv:any;

  firstName:string;
  lastName:string;

  static EVENT_USER_SELECTED:string = "searchUserSelected";
  static $inject = [ProfileService.NAME, '$rootScope'];

  constructor(private profileService:ProfileService, private rootScope:IRootScopeService){
    this.buttons = this.getButtons();
    rootScope.$on(AboutDirectiveController.EVENT_ON_EMPLOYEEDATA_SET,(event, args)=>{
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

  selectedItemChange(_user_:User):void{
    if(_user_){
      this.rootScope.$broadcast(ToolbarController.EVENT_USER_SELECTED, {username: _user_.value});
    }
  }

  querySearch(query:any):any{
    return query ? this.users.filter(this.filter(query)) : this.users;
  }

  filter(query):any{
    return (user:any)=>{
      var lowerCaseUserDisplay:string = user.display.toLocaleLowerCase().trim();
      return lowerCaseUserDisplay.indexOf(query) !== -1;
    }
  }

  $onInit():void {
    this.profileService.getAllEmployees()
      .then((employees:Array<Employee>)=> {
        this.users = this.parseEmployees(employees);
      });
  }

  private parseEmployees(employees:Array<Employee>):Array<User>{
    var users:Array<User> = [];
    for (var emp of employees) {
      users.push({
        value: emp.username,
        display: emp.firstName + ' ' + emp.lastName
      });
    }
    return users;
  }
}
