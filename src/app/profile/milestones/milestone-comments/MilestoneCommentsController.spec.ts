import {MilestoneCommentsController} from "./MilestoneCommentsController";
import {IMilestoneService, MilestoneService} from "../../services/MilestoneService";
import {ISessionService, SessionService} from "../../../auth/service/SessionService";
import {SessionMock} from "../../../auth/login/login.spec";
import {MockMilestoneService} from "../timeline/MilestoneCreateComponent.spec";
import {ORDINEO_PROFILE} from "../../ProfileModule";
import IScope = angular.IScope;
import IRootScopeService = angular.IRootScopeService;
import IProvideService = angular.auto.IProvideService;
import {MilestoneCommentsComponent} from "./MilestoneCommentsComponent";
import {MockMilestone} from "../../../../../test/mock/MockMilestone";

describe("MilestoneCommentsController", ()=> {
  var scope: IScope;
  var ctrl: MilestoneCommentsController;
  var milestoneService: IMilestoneService;
  var sessionService: ISessionService;

  beforeEach(angular.mock.module(ORDINEO_PROFILE, ($provide: IProvideService)=> {
    milestoneService = new MockMilestoneService();
    sessionService = new SessionMock();

    $provide.service(MilestoneService.NAME, ()=>milestoneService);
    $provide.service(SessionService.NAME, ()=>sessionService);
  }));

  beforeEach(inject((_$componentController_, _$rootScope_: IRootScopeService)=> {
    scope = _$rootScope_.$new();
    ctrl = _$componentController_(MilestoneCommentsComponent.NAME, {$scope: scope});
  }));

  describe("on init", ()=> {

    it("should subscribe on milestone selected", ()=> {
      spyOn(milestoneService, "subscribeOnMilestoneSelected");
      ctrl.$onInit();
      expect(milestoneService.subscribeOnMilestoneSelected).toHaveBeenCalled();
    });

    it("should set the viewmodel to the selected milestone if it is not undefined", ()=> {
      spyOn(ctrl, "setViewModel");
      spyOn(milestoneService, "getSelectedMilestone").and.returnValue(new MockMilestone());
      ctrl.$onInit();
      expect(ctrl.setViewModel).toHaveBeenCalled();
    });

    it("should not set the viewmodel if there is no milestone", ()=> {
      spyOn(ctrl, "setViewModel");
      spyOn(milestoneService, "getSelectedMilestone").and.returnValue(undefined);
      ctrl.$onInit();
      expect(ctrl.setViewModel).not.toHaveBeenCalled();
    });
  });

});
