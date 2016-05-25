import {ProfileService} from "../../../profile/services/ProfileService";
import {Employee} from "../../models/employee";
import {Navigator, INavigator} from "../../services/Navigator";
import "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import IScope = angular.IScope;
import {ScopeObserver} from "../../services/ScopeObserver";
import {Observable} from "rxjs/Rx";
import {fromPromise} from "rxjs/observable/fromPromise";
import IQService = angular.IQService;
import IDeferred = angular.IDeferred;
import IPromise = angular.IPromise;
var _ = require("lodash");

export class ProfileSearchController {
  public button: any;
  public users: any;
  private searchStream: Observable<any>;

  static $inject: string[] = [
    ScopeObserver.NAME,
    "$scope",
    ProfileService.NAME,
    Navigator.NAME,
    "$q"];

  constructor(private scopeObserver: ScopeObserver,
              private scope: IScope,
              private profileService: ProfileService,
              private navigator: INavigator,
              private $q: IQService) {
  }

  selectedItemChange(usr: User): void {
    if (usr) {
      this.navigator.goToUserProfile(usr.value);
    }
  }

  $onInit(): void {
    this.button = {title: "search", icon: "act:search"};
    this.searchStream = this.scopeObserver
      .watch(this.scope, "$ctrl.searchText")
      .filter((qry: string) => {
        return qry !== undefined && qry !== null && qry !== "";
      })
      .debounceTime(750)
      .distinctUntilChanged();
  }

  searchEmployees(): IPromise<User[]> {
    let deferred: IDeferred<any> = this.$q.defer();
    this.searchStream
      .mergeMap((qry: string) => {
        return fromPromise(this.profileService.searchEmployee(qry));
      })
      .map((response: any) => {
        return this.parseEmployees(response.data["_embedded"].employees);
      })
      .subscribe((employees: User[]) => deferred.resolve(employees));
    return deferred.promise;
  }

  private parseEmployees(employees: Array<Employee>): Array<User> {
    var users: Array<User> = [];
    for (var emp of employees) {
      users.push({
        value: emp.username,
        display: emp.firstName + " " + emp.lastName
      });
    }
    return users;
  }
}
export interface User {
  value: string;
  display: string;
}
