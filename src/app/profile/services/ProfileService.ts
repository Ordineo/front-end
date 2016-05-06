import IPromise = angular.IPromise;
import {TraversonHalService} from "../../traverson/service/TraversonHalService";
import {GatewayApiService} from "../../gateway/service/GatewayApiService";
import {Employee} from "../../core/models/employee";
import IHttpService = angular.IHttpService;
import IQService = angular.IQService;
import IDeferred = angular.IDeferred;
import IScope = angular.IScope;
import IRootScopeService = angular.IRootScopeService;
export interface IProfileService {
  getAboutInfoByUsername(userName:string):IPromise<any>;
  getAllEmployees():IPromise<any>;
  putEmployeeData(employee:Employee):IPromise<any>;
  getBasicInfoByUsername(userName:string):IPromise<any>;
}

export class ProfileService implements IProfileService {
  static NAME:string = "ordineoProfileService";
  static EVENT_USERNAME_CHANGED = "profileservice.event_username_changed";

  username:string;

  static $inject:Array<string> = [
    TraversonHalService.SERVICE_NAME,
    GatewayApiService.SERVICE_NAME,
    '$q',
    '$http',
    '$rootScope'];

  constructor(private traverson:TraversonHalService,
              private gateway:GatewayApiService,
              private $q:IQService,
              private $http:IHttpService,
              private $rootScope:IRootScopeService) {
  }

  public subscribeUsernameChanged(scope:IScope, callBack:any):void {
    var handler:any = this.$rootScope.$on(ProfileService.EVENT_USERNAME_CHANGED, callBack);
    scope.$on('$destroy', handler);
  }

  public setUsername(username:string) {
    this.username = username;
    this.notifyUsernameChanged()
  }

  public notifyUsernameChanged():void {
    this.$rootScope.$emit(ProfileService.EVENT_USERNAME_CHANGED, {username: this.username});
  }

  public putEmployeeData(employee:any):IPromise<any> {
    /*Todo use traverson for post*/
    return this.$http.put(employee._links.self.href,
      employee);
    // var test = this.traverson.hal()
    //   .from(this.gateway.getSearchEmployeeApi())
    //   .useAngularHttp()
    //   .follow('employee', 'self')
    //   .withTemplateParameters({username: employee.username})
    //   .withRequestOptions({
    //     headers: {
    //       'Content-type': 'application/json'
    //     }
    //   })
    //   .put(employee)
    //   .result;
    // debugger;
    // console.log(test);
    //
    // return test;
  }

  public getAllEmployees():IPromise<any> {
    return this.traverson.hal()
      .from(this.gateway.getEmployeesApi())
      .useAngularHttp()
      .jsonHal()
      .follow('employees', 'employees[$all]')
      .getResource()
      .result;
  }

  public getAboutInfoByUsername(userName:string):IPromise<any> {
    return this.traverson.hal()
      .from(this.gateway.getSearchEmployeeApi())
      .useAngularHttp()
      .jsonHal()
      .follow('employee')
      .withTemplateParameters({username: userName})
      .getResource()
      .result;
  }

  public getBasicInfoByUsername(userName:string):IPromise<any> {
    return this.traverson.hal()
      .from(this.gateway.getSearchEmployeeApi())
      .useAngularHttp()
      .jsonHal()
      .follow('employee')
      .withTemplateParameters({username: userName, projection: 'searchProjection'})
      .getResource()
      .result;
  }

  public setProfilePicture(file:any, uploadUrl:string):IPromise<any> {
    var fd = new FormData();
    fd.append('profilePicture', file);
    return this.$http.post(uploadUrl, fd, {
      cache: false,
      headers: {
        'Content-type': undefined
      },
      transformRequest: angular.identity
    });
  }
}
