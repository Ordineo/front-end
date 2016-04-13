import IPromise = angular.IPromise;
import {Employee} from "../../src/app/core/models/employee";
import {IProfileService} from "../../src/app/profile/services/ProfileService";

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