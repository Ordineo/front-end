import {ORDINEO_LAYOUT} from "./LayoutModule";
import IProvideService = angular.auto.IProvideService;
import {DashboardComponent, DashboardComponentController} from "./DashboardComponent";
import IRootScopeService = angular.IRootScopeService;
import IScope = angular.IScope;
import {ISessionService, SessionService} from "../auth/service/SessionService";
import {IAuthService, AuthService} from "../auth/service/AuthService";
import {AuthMock, SessionMock} from "../auth/login/login.spec";
import {IProfileService, ProfileService} from "../profile/services/ProfileService";
import IQService = angular.IQService;
import {MockProfileService} from "../../../test/mock/MockProfileService";

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
        profileService = new MockProfileService();

        $provide.service(AuthService.NAME, ()=>authService);
        $provide.service(SessionService.NAME, ()=>sessionService);
        $provide.service(ProfileService.NAME, ()=> profileService)
      })
  );

  beforeEach(inject((_$componentController_, _$rootScope_:IRootScopeService, _$q_:IQService)=> {
    scope = _$rootScope_.$new();
    $q = _$q_;
    ctrl = _$componentController_(DashboardComponent.NAME, {$scope: scope});
  }));

  describe("on init", ()=> {
    var defer;

    beforeEach(function () {
      defer = $q.defer();
    });

    it("should get basic info by username", ()=> {
      spyOn(profileService, "getBasicInfoByUsername").and.returnValue(defer.promise);
      ctrl.$onInit();
      expect(profileService.getBasicInfoByUsername).toHaveBeenCalled();
      defer.resolve({username: "mike", firstName: "Michael", lastName: "Vandendriessche"});
      scope.$apply();

      expect(ctrl.name.first).toBe("Michael");
      expect(ctrl.name.last).toBe("Vandendriessche");
    });
  });

});
