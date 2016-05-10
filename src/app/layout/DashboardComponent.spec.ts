import {ORDINEO_LAYOUT} from "./LayoutModule";
import IProvideService = angular.auto.IProvideService;
import {DashboardComponent, DashboardComponentController} from "./DashboardComponent";
import IRootScopeService = angular.IRootScopeService;
import IScope = angular.IScope;
import {ISessionService, SessionService} from "../auth/service/SessionService";
import {IAuthService, AuthService} from "../auth/service/AuthService";
import {AuthMock, SessionMock} from "../auth/login/login.spec";
import {IProfileService, ProfileService} from "../profile/services/ProfileService";
import {Employee} from "../core/models/employee";
import IQService = angular.IQService;

describe("Dashboard component controller", ()=> {
  var scope:IScope;
  var $q:IQService;
  var ctrl:DashboardComponentController;
  var authService:IAuthService;
  var sessionService:ISessionService;
  var profileService:IProfileService;

  beforeEach(
    angular.mock.module(ORDINEO_LAYOUT,
      ($provide:IProvideService)=> {

        authService = new AuthMock();
        sessionService = new SessionMock();
        profileService = new ProfileMock();

        $provide.service(AuthService.NAME, ()=>authService);
        $provide.service(SessionService.NAME, ()=>sessionService);
        $provide.service(ProfileService.NAME, ()=> profileService)
      }) //is this the correct module?
  );

  beforeEach(inject((_$componentController_, _$rootScope_:IRootScopeService, _$q_:IQService)=> {
    scope = _$rootScope_.$new();
    $q = _$q_;
    ctrl = _$componentController_(DashboardComponent.NAME, {$scope: scope});
  }));

  it("should authenticate on init", ()=>{
    spyOn(authService, "authenticate");
    var defer = $q.defer();

    spyOn(profileService, "getBasicInfoByUsername").and.returnValue(defer.promise);
    ctrl.$onInit();
    expect(authService.authenticate).toHaveBeenCalled();
  });

  it("should get basic info by username on init", ()=> {
    var defer = $q.defer();
    spyOn(profileService, "getBasicInfoByUsername").and.returnValue(defer.promise);
    ctrl.$onInit();
    expect(profileService.getBasicInfoByUsername).toHaveBeenCalled();
  });

});

export class ProfileMock implements IProfileService{
  getAboutInfoByUsername(userName:string):angular.IPromise<any> {
    return undefined;
  }

  getAllEmployees():angular.IPromise<any> {
    return undefined;
  }

  putEmployeeData(employee:Employee):angular.IPromise<any> {
    return undefined;
  }

  getBasicInfoByUsername(username: String):angular.IPromise<any>{
    return undefined;
  }

}
