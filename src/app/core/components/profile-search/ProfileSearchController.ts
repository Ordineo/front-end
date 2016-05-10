import {ProfileService} from "../../../profile/services/ProfileService";
import {Employee} from "../../models/employee";
export class ProfileSearchController {
  public button:any;
  public users:Array<User>;

  static EVENT_USER_SELECTED:string = "searchUserSelected";
  static $inject = [ProfileService.NAME];

  constructor(private profileService:ProfileService) {
    this.button = {title: 'search', icon: 'act:search'};
  }

  selectedItemChange(_user_:User):void {
    if (_user_) {
      this.profileService.setUsername(_user_.value);
    }
  }

  querySearch(query:any):any {
    return query ? this.users.filter(this.filter(query)) : this.users;
  }

  filter(query):any {
    return (user:any)=> {
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

  private parseEmployees(employees:Array<Employee>):Array<User> {
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

export interface User {
  value:string;
  display:string;
}
