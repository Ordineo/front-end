import {IProfileService} from "../../src/profile/services/ProfileService";
import IPromise = angular.IPromise;
export class MockProfileService implements IProfileService{
  public getAboutInfoByUsername(username:string):IPromise<any>{
    return null;
  }

  public getMock():IPromise<any>{
    return null;
  }
}
