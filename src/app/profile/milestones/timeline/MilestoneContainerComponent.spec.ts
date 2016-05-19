import {ORDINEO_CORE} from "../../../core/core.module";
import IProvideService = angular.auto.IProvideService;
import {MockProfileService} from "../../../../../test/mock/MockProfileService";
import {ProfileService, IProfileService} from "../../services/ProfileService";
import {SessionService, ISessionService} from "../../../auth/service/SessionService";
import {SessionMock} from "../../../auth/login/login.spec";
import {IMilestoneService, MilestoneService} from "../../services/MilestoneService";
import {MockMilestoneService} from "./MilestoneCreateComponent.spec";
import {MilestoneContainerComponent, MilestoneContainerController} from "./MilestoneContainerComponent";
import IRootScopeService = angular.IRootScopeService;
import IScope = angular.IScope;
import {ORDINEO_PROFILE} from "../../ProfileModule";

describe("describe text", ()=> {
  var scope:IScope;
  var ctrl:MilestoneContainerController;
  var milestoneService:IMilestoneService;
  var profileService:IProfileService;
  var sessionService:ISessionService;

  beforeEach(angular.mock.module(ORDINEO_PROFILE, ($provide:IProvideService)=> {
    milestoneService = new MockMilestoneService();
    profileService = new MockProfileService();
    sessionService = new SessionMock();

    $provide.service(MilestoneService.NAME, ()=>milestoneService);
    $provide.service(ProfileService.NAME, ()=>profileService);
    $provide.service(SessionService.NAME, ()=>sessionService);
    // $provide.service('$scope', $rootScope.$new);
  }));

  beforeEach(inject((_$componentController_, _$rootScope_:IRootScopeService)=> {
    scope = _$rootScope_.$new();
    ctrl = _$componentController_(MilestoneContainerComponent.NAME, {$scope: scope});
  }));

  describe("onContentLoaded", ()=> {

  it("test", ()=> {
    console.log("logtest");
  });

});

});
