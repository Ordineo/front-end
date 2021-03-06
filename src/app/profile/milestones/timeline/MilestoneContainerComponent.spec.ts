import {MockProfileService} from "../../../../../test/mock/MockProfileService";
import {ProfileService, IProfileService} from "../../services/ProfileService";
import {SessionService, ISessionService} from "../../../auth/service/SessionService";
import {SessionMock} from "../../../auth/login/login.spec";
import {IMilestoneService, MilestoneService} from "../../services/MilestoneService";
import {MockMilestoneService} from "./MilestoneCreateComponent.spec";
import {MilestoneContainerComponent, MilestoneContainerController} from "./MilestoneContainerComponent";
import {ORDINEO_PROFILE} from "../../ProfileModule";
import {ActionButton} from "../../../core/components/action-button/ActionButtonComponent";
import IProvideService = angular.auto.IProvideService;
import IRootScopeService = angular.IRootScopeService;
import IScope = angular.IScope;
import IAngularEvent = angular.IAngularEvent;
import IQService = angular.IQService;

describe("MilestoneContainerController", ()=> {
  var scope: IScope;
  var ctrl: MilestoneContainerController;
  var milestoneService: IMilestoneService;
  var profileService: IProfileService;
  var sessionService: ISessionService;
  var $q: IQService;


  beforeEach(angular.mock.module(ORDINEO_PROFILE, ($provide: IProvideService)=> {
    milestoneService = new MockMilestoneService();
    profileService = new MockProfileService();
    sessionService = new SessionMock();

    $provide.service(MilestoneService.NAME, ()=>milestoneService);
    $provide.service(ProfileService.NAME, ()=>profileService);
    $provide.service(SessionService.NAME, ()=>sessionService);
  }));

  beforeEach(inject((_$componentController_, _$rootScope_: IRootScopeService, _$q_: IQService)=> {
    scope = _$rootScope_.$new();
    ctrl = _$componentController_(MilestoneContainerComponent.NAME, {$scope: scope});
    $q = _$q_;
  }));

  describe("on init", ()=> {

    it("configures card header buttons", ()=> {
      spyOn(ctrl, "configureCardHeaderButtons");
      ctrl.$onInit();
      expect((ctrl as any).configureCardHeaderButtons).toHaveBeenCalled();
    });

    it("actionbuttons should not be empty", ()=> {
      ctrl.$onInit();
      expect(ctrl.actionButtons).not.toEqual([]);
    });

    it("initialises create button", ()=> {
      ctrl.$onInit();
      var btnCreate = 'btnCreate';
      var button = ctrl.actionButtons.filter(obj => obj.aClass === btnCreate)[0];
      expect(button.aClass).toEqual(btnCreate);
    });

    it("initialises save button", ()=> {
      ctrl.$onInit();
      var btnSave = 'btnSave';
      var button: any = ctrl.actionButtons.filter(obj => obj.aClass === btnSave)[0];
      expect(button.aClass).toEqual(btnSave);
    });

    it("initialises cancel button", ()=> {
      ctrl.$onInit();
      var btnCancel = 'btnCancel';
      var button: any = ctrl.actionButtons.filter(obj => obj.aClass === btnCancel)[0];
      expect(button.aClass).toEqual(btnCancel);
    });

    it("changes username", ()=> {
      var testValue = "testUser";
      spyOn(sessionService, "getUsername").and.returnValue(testValue);
      ctrl.$onInit();
      expect(ctrl.username).toBe(testValue);
    });

    it("should subscribe on user name changed", ()=> {
      spyOn(profileService, "subscribeUsernameChanged");
      ctrl.$onInit();
      expect(profileService.subscribeUsernameChanged).toHaveBeenCalled();
    });

  });

  describe("clicking the save button", ()=> {
    var deferred;

    beforeEach(()=> {
      ctrl.$onInit();
      deferred = $q.defer();
    });


    it("should toggle create mode when a milestone is successfully created", ()=> {
      spyOn(milestoneService, "createMilestoneByUsername").and.returnValue(deferred.promise);
      spyOn(ctrl, "toggleCreateMode");
      var button: ActionButton = (ctrl as any).saveButton;
      button.onClick();
      deferred.resolve({});
      scope.$digest();
      expect((ctrl as any).toggleCreateMode).toHaveBeenCalled();
    });

    describe("should throw an error when a milestone is not successfully created", ()=> {

      it(": 409: You already have a milestone", ()=> {
        spyOn(milestoneService, "createMilestoneByUsername").and.returnValue(deferred.promise);
        (milestoneService as any).milestone = {
          title: "title"
        };
        var button: ActionButton = (ctrl as any).saveButton;
        button.onClick();
        deferred.reject({status: 409, errorMsg: ""});
        scope.$digest();

        expect((ctrl as any).errorMsg).toEqual("You already have a milestone " + (milestoneService as any).milestone.title);
      });

      it(": >500 (tested with 501):  check your connection", ()=> {
        spyOn(milestoneService, "createMilestoneByUsername").and.returnValue(deferred.promise);
        var button: ActionButton = (ctrl as any).saveButton;
        button.onClick();
        deferred.reject({status: 501, errorMsg: ""});
        scope.$digest();

        expect((ctrl as any).errorMsg).toEqual("check your connection");
      });

      it(": >=400 && <500 (tested with 404): Please select a correct objective", ()=> {
        spyOn(milestoneService, "createMilestoneByUsername").and.returnValue(deferred.promise);
        var button: ActionButton = (ctrl as any).saveButton;
        button.onClick();
        deferred.reject({status: 404, errorMsg: ""});
        scope.$digest();

        expect((ctrl as any).errorMsg).toEqual("Please select a correct objective");
      });

      it(": anything else (tested with 500): Something went wrong", ()=> {
        spyOn(milestoneService, "createMilestoneByUsername").and.returnValue(deferred.promise);
        var button: ActionButton = (ctrl as any).saveButton;
        button.onClick();
        deferred.reject({status: 500, errorMsg: ""});
        scope.$digest();

        expect((ctrl as any).errorMsg).toEqual("Something went wrong");
      });

      it("error message should be \"Please select a correct objective\" when no promise is returned", ()=> {
        spyOn(milestoneService, "createMilestoneByUsername");
        var button: ActionButton = (ctrl as any).saveButton;
        button.onClick();

        expect((ctrl as any).errorMsg).toEqual("Please select a correct objective");
      });
    });

  });

  describe("cancel button", ()=> {
    it("onclick", ()=> {
      spyOn(ctrl, "toggleCreateMode");
      ctrl.$onInit();
      (ctrl as any).initCancelButton();
      var button: ActionButton = (ctrl as any).cancelButton;
      button.onClick();
      expect((ctrl as any).toggleCreateMode).toHaveBeenCalled();
    });
  });

  describe("onUserChanged", ()=> {
    var evt: IAngularEvent;
    var username: string;
    var data: any;
    var callback: any;

    beforeEach(()=> {
      evt = new class event implements IAngularEvent {
        targetScope: angular.IScope;
        currentScope: angular.IScope;
        name: string;
        preventDefault: Function;
        defaultPrevented: boolean;
      };
      username = "test";
      data = {username: username};
      callback = ctrl.onUserChanged();
    });

    it("should update username", ()=> {
      callback(evt, data);
      expect(ctrl.username).toEqual(username);
    });

    it("should disable create mode after creating", ()=> {
      ctrl.$onInit();
      ctrl.createMode = true;
      callback(evt, data);
      expect(ctrl.createMode).toBeFalsy();
    });

  });

  describe("toggleCreateMode", ()=> {
    var btnCreate: string;
    var button: ActionButton;
    beforeEach(()=> {
      ctrl.$onInit();
      btnCreate = 'btnCreate';
      button = ctrl.actionButtons.filter(obj => obj.aClass === btnCreate)[0];
    });

    it("should toggle create mode to true when false", ()=> {
      ctrl.createMode = false;
      button.onClick();
      expect(ctrl.createMode).toBeTruthy();
    });

    it("should toggle create mode to false when true", ()=> {
      ctrl.createMode = true;
      button.onClick();
      expect(ctrl.createMode).toBeFalsy();
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
      var button = (ctrl as any).saveButton;
      expect(button.isDisabled).toBeFalsy();
    });

    it("is false, savebutton should be disabled", ()=> {
      ctrl.$onInit();
      ctrl.isSaveEnabled(false);
      var button = (ctrl as any).saveButton;
      expect(button.isDisabled).toBeTruthy();
    });
  });

});
