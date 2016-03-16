import IPromise = angular.IPromise;
import {TraversonHalService} from "../../traverson/service/TraversonHalService";
import IHttpService = angular.IHttpService;
import IQService = angular.IQService;
import IDeferred = angular.IDeferred;
import {GatewayApiService} from "../../gateway/service/GatewayApiService";
export interface IProfileService {
  getAboutInfoByUsername(userName:string):IPromise<any>;
  getMock():IPromise<any>;
}

export class ProfileService implements IProfileService {
  static NAME:string = "ordineo.profile.service";
  static $inject:Array<string> = [
    TraversonHalService.SERVICE_NAME,
    GatewayApiService.SERVICE_NAME,
    '$q'];

  constructor(private traverson:TraversonHalService, private gateway:GatewayApiService, private $q:IQService) {
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

  public getAboutInfoById(userId:number):IPromise<any> {
    return this.traverson.hal()
      .from(this.gateway.getEmployeesApi())
      .jsonHal()
      .follow('employees',userId)
      .getResource()
      .result
  }

  public getMock():IPromise<any> {
    var deferred:IDeferred<any> = this.$q.defer();
    setTimeout(()=> {
      var data = require('../../../test/mockdata/about.json');
      if (data !== null) {
        deferred.resolve(data);
      } else {
        deferred.reject("No data");
      }
    },1000);

    return deferred.promise;
  }

}
