import {IProfileService} from "../../src/profile/services/ProfileService";
import {Employee} from "../../src/core/models/employee";
import IPromise = angular.IPromise;

export class MockProfileService implements IProfileService {
  getAboutInfoByUsername(username:string):IPromise<any> {
    return null;
  }

  putEmployeeData(employee:Employee):IPromise<any> {
    return null;
  };

  getAllEmployees():angular.IPromise<any> {
    return null;
  }
}
