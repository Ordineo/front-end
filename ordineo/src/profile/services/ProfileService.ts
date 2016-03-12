import IPromise = angular.IPromise;
import {TraversonHalService} from "../../traverson/service/TraversonHalService";
import IHttpService = angular.IHttpService;
import IQService = angular.IQService;
import IDeferred = angular.IDeferred;
export interface IProfileService {
  getAboutInfo(userName:string):IPromise<any>;
}

export class ProfileService implements IProfileService {
  static NAME:string = "ordineo.profile.service";
  static $inject:Array<string> = [TraversonHalService.SERVICE_NAME, '$q'];

  constructor(private traverson:TraversonHalService, private $q:IQService) {

  }

  public getAboutInfo(userName:string):IPromise<any> {
    //todo fetch data with traverson service
    return this.getMock();
  }

  private getMock():IPromise<any> {
    var deferred:IDeferred<any> = this.$q.defer();
    setTimeout(()=> {
      var data = require('../../../test/mockdata/about.json');
      if (data !== null) {
        deferred.resolve(data);
      } else {
        deferred.reject("No data");
      }
    }, 3000);

    return deferred.promise;
  }

}
