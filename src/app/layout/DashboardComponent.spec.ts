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


describe("Dashboard component controller", ()=> {
  var scope:IScope;
  var ctrl:DashboardComponentController;
  var authService:IAuthService;
  var sessionService:ISessionService;
  var profileService:IProfileService;

  beforeEach(
    angular.mock.module(ORDINEO_LAYOUT,
      ($provide:IProvideService)=> {

        // these are in the login.spec.ts file
        authService = new AuthMock();
        sessionService = new SessionMock();
        profileService = new ProfileMock(); // is this ok?

        $provide.service(AuthService.NAME, ()=>authService);
        $provide.service(SessionService.NAME, ()=>sessionService);
        $provide.service(ProfileService.NAME, ()=> profileService)
      }) //is this the correct module?
  );

  beforeEach(inject((_$componentController_, _$rootScope_:IRootScopeService)=> {
    scope = _$rootScope_.$new();
    ctrl = _$componentController_(DashboardComponent.NAME, {$scope: scope});
  }));

  it("should authenticate on init", ()=>{
    spyOn(authService, authService.authenticate.name);
    ctrl.$onInit();
    expect(authService.authenticate).toHaveBeenCalled();
  });

  it("should get basic info by username on init", ()=> {
    spyOn(profileService, profileService.getBasicInfoByUsername.name);
    ctrl.$onInit();
    expect(profileService.getBasicInfoByUsername).toHaveBeenCalledWith();
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
