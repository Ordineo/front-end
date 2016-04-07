import IPromise = angular.IPromise;
import {Employee} from "../../app/src/core/models/employee";
import {IProfileService} from "../../app/src/profile/services/ProfileService";

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
