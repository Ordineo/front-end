import IPromise = angular.IPromise;
import {TraversonHalService} from "../../traverson/service/TraversonHalService";
import IHttpService = angular.IHttpService;
import IQService = angular.IQService;
import IDeferred = angular.IDeferred;
import {GatewayApiService} from "../../gateway/service/GatewayApiService";
import {Employee} from "../../core/models/employee";
export interface IProfileService {
  getAboutInfoByUsername(userName:string):IPromise<any>;
  putEmployeeData(employee:Employee):IPromise<any>;
}

export class ProfileService implements IProfileService {
  static NAME:string = "ordineo.profile.service";
  static $inject:Array<string> = [
    TraversonHalService.SERVICE_NAME,
    GatewayApiService.SERVICE_NAME,
    '$q',
    '$http'];

  constructor(private traverson:TraversonHalService,
              private gateway:GatewayApiService,
              private $q:IQService,
              private  $http:IHttpService) {
  }

  public putEmployeeData(employee:Employee):IPromise<any> {
    return this.traverson.hal()
      .from(this.gateway.getEmployeesApi())
      .follow('employees', 'search', 'employee','self')
      .withTemplateParameters({username: employee.username})
      .withRequestOptions({
        headers: {
          'Content-type':'application/json'
        }
      })
      .put(employee)
      .result;
  }

  public getAboutInfoByUsername(userName:string):IPromise<any> {
    return this.traverson.hal()
      .from(this.gateway.getEmployeesApi())
      .jsonHal()
      .follow('employees', 'search', 'employee')
      .withTemplateParameters({username: userName})
      .getResource()
      .result;
  }
}
