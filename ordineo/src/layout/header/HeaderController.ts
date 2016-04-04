import {ProfileService} from "../../profile/services/ProfileService";
import {Employee} from "../../core/models/employee";
import IRootScopeService = angular.IRootScopeService;
export class HeaderController {
  public button:any;
  public users:Array<User>;

  static EVENT_USER_SELECTED:string = "searchUserSelected";
  static $inject = [ProfileService.NAME, '$rootScope'];

  constructor(private profileService:ProfileService, private rootScope:IRootScopeService) {
    this.button = {title: 'search', icon: 'act:search'};
  }

  selectedItemChange(user:any):void{
    if(user){
      this.rootScope.$broadcast(HeaderController.EVENT_USER_SELECTED, {username: user.value});
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

interface User{
  value:string;
  display:string;
}
