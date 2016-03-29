import {IProfileService} from "../../src/profile/services/ProfileService";
import IPromise = angular.IPromise;
import {Employee} from "../../src/core/models/employee";

export class MockProfileService implements IProfileService{
  public getAboutInfoByUsername(username:string):IPromise<any>{
    return null;
  }

  putEmployeeData(employee:Employee):IPromise<any>{
    return null;
  };
}
