import IPromise = angular.IPromise;
import {TraversonHalService} from "../../traverson/service/TraversonHalService";
import {GatewayApiService} from "../../gateway/service/GatewayApiService";
import {Employee} from "../../core/models/employee";
import IHttpService = angular.IHttpService;
import IQService = angular.IQService;
import IDeferred = angular.IDeferred;
export interface IProfileService {
  getAboutInfoByUsername(userName:string):IPromise<any>;
  getAllEmployees():IPromise<any>;
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
      .from(this.gateway.getSearchEmployeeApi())
      .follow('employee','self')
      .withTemplateParameters({username: employee.username})
      .withRequestOptions({
        headers: {
          'Content-type':'application/json'
        }
      })
      .put(employee)
      .result;
  }

  public getAllEmployees():IPromise<any>{
    return this.traverson.hal()
      .from(this.gateway.getEmployeesApi())
      .jsonHal()
      .follow('employees','employees[$all]')
      .getResource()
      .result;
  }

  public getAboutInfoByUsername(userName:string):IPromise<any> {
    return this.traverson.hal()
      .from(this.gateway.getSearchEmployeeApi())
      .jsonHal()
      .follow('employee')
      .withTemplateParameters({username: userName})
      .getResource()
      .result;
  }
}
