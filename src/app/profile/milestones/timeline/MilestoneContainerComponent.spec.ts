import {MockProfileService} from "../../../../../test/mock/MockProfileService";
import {ProfileService, IProfileService} from "../../services/ProfileService";
import {SessionService, ISessionService} from "../../../auth/service/SessionService";
import {SessionMock} from "../../../auth/login/login.spec";
import {IMilestoneService, MilestoneService} from "../../services/MilestoneService";
import {MockMilestoneService} from "./MilestoneCreateComponent.spec";
import {MilestoneContainerComponent, MilestoneContainerController} from "./MilestoneContainerComponent";
import {ORDINEO_PROFILE} from "../../ProfileModule";
import IProvideService = angular.auto.IProvideService;
import IRootScopeService = angular.IRootScopeService;
import IScope = angular.IScope;

describe("MilestoneContainerController", ()=> {
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
  }));

  beforeEach(inject((_$componentController_, _$rootScope_:IRootScopeService)=> {
    scope = _$rootScope_.$new();
    ctrl = _$componentController_(MilestoneContainerComponent.NAME, {$scope: scope});
  }));

  describe("on init", ()=> {

    it("configures card header buttons", ()=> {
      spyOn(ctrl, "configureCardHeaderButtons");
      ctrl.$onInit();
      expect(ctrl.configureCardHeaderButtons).toHaveBeenCalled();
    });

    it("actionbuttons should not be empty", ()=> {
      ctrl.$onInit();
      expect(ctrl.actionButtons).not.toEqual([]);
    });

    it("initialises create button", ()=> {
      ctrl.$onInit();
      var btnCreate = 'btnCreate';
      var button = ctrl.actionButtons.find(obj => obj.aClass === btnCreate);
      expect(button.aClass).toEqual(btnCreate);
    });

    it("initialises save button", ()=> {
      ctrl.$onInit();
      var btnSave = 'btnSave';
      var button = ctrl.actionButtons.find(obj => obj.aClass === btnSave);
      expect(button.aClass).toEqual(btnSave);
    });

    it("initialises cancel button", ()=> {
      ctrl.$onInit();
      var btnCancel = 'btnCancel';
      var button = ctrl.actionButtons.find(obj => obj.aClass === btnCancel);
      expect(button.aClass).toEqual(btnCancel);
    });

  });

  describe("onContentLoaded", ()=> {

    it("when given true, isContentLoaded should be true", ()=> {
      ctrl.onContentLoaded(true);
      expect(ctrl.isContentLoaded).toBeTruthy();
    });

    it("when given false, isContentLoaded should be false", ()=> {
      ctrl.onContentLoaded(false);
      expect(ctrl.isContentLoaded).toBeFalsy();
    });

  });

  describe("isSaveEnabled", ()=> {

    it("is true, savebutton should not be disabled", ()=> {
      ctrl.$onInit();
      ctrl.isSaveEnabled(true);
      var button = ctrl.saveButton;
      expect(button.isDisabled).toBeFalsy();
    });

    it("is false, savebutton should be disabled", ()=> {
      ctrl.$onInit();
      ctrl.isSaveEnabled(false);
      var button = ctrl.saveButton;
      expect(button.isDisabled).toBeTruthy();
    });
  });

});
