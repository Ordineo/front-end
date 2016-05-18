import IPromise = angular.IPromise;
import {Employee} from "../../src/app/core/models/employee";
import {IProfileService} from "../../src/app/profile/services/ProfileService";

export class MockProfileService implements IProfileService {
  setUsername(username:string):void {
  }

  subscribeUsernameChanged(scope:angular.IScope, callBack:any):void {
  }

  notifyUsernameChanged():void {
  }

  setProfilePicture(file:any, uploadUrl:string):angular.IPromise<any> {
    return undefined;
  }

  getBasicInfoByUsername(userName:string):angular.IPromise<any> {
    return undefined;
  }

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
