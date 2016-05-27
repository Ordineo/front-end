import {MilestoneCommentsController} from "./MilestoneCommentsController";
import {IMilestoneService, MilestoneService} from "../../services/MilestoneService";
import {ISessionService, SessionService} from "../../../auth/service/SessionService";
import {SessionMock} from "../../../auth/login/login.spec";
import {MockMilestoneService} from "../timeline/MilestoneCreateComponent.spec";
import {ORDINEO_PROFILE} from "../../ProfileModule";
import {MilestoneCommentsComponent} from "./MilestoneCommentsComponent";
import {MockMilestone} from "../../../../../test/mock/MockMilestone";
import {MockObjective} from "../../../../../test/mock/MockObjective";
import IScope = angular.IScope;
import IRootScopeService = angular.IRootScopeService;
import IProvideService = angular.auto.IProvideService;
import IQService = angular.IQService;

describe("MilestoneCommentsController", ()=> {
  var scope: IScope;
  var ctrl: MilestoneCommentsController;
  var milestoneService: IMilestoneService;
  var sessionService: ISessionService;
  var $q: IQService;

  beforeEach(angular.mock.module(ORDINEO_PROFILE, ($provide: IProvideService)=> {
    milestoneService = new MockMilestoneService();
    sessionService = new SessionMock();

    $provide.service(MilestoneService.NAME, ()=>milestoneService);
    $provide.service(SessionService.NAME, ()=>sessionService);
  }));

  beforeEach(inject((_$componentController_, _$rootScope_: IRootScopeService, _$q_: IQService)=> {
    scope = _$rootScope_.$new();
    ctrl = _$componentController_(MilestoneCommentsComponent.NAME, {$scope: scope});
    $q = _$q_;
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

  describe("update view model", ()=> {

    //TODO make tests
    it("", ()=> {
      var updateViewModel = ctrl.updateViewModel()();
// updateViewModel()

      expect(false).toBeTruthy();
    });
  });

  describe("set view model", ()=> {

    // it("should initialise the milestone when given a milestone", ()=> {
    //   var milestone = new MockMilestone();
    //   ctrl.setViewModel(milestone);
    //   expect(ctrl.milestone).toBe(milestone);
    // });

    it("should get the comments if a milestone is given", ()=> {
      spyOn(ctrl, "getComments");
      ctrl.setViewModel(new MockMilestone());
      expect(ctrl.getComments).toHaveBeenCalled();
    });

    it("should not do anything when not given a milestone", ()=> {
      //TODO: fix this test
      let controllerBefore = {
        comments: ctrl.comments,
        commentsLoaded: ctrl.commentsLoaded,
        username: ctrl.username,
        commentFieldData: ctrl.commentFieldData
      };
      ctrl.setViewModel(null);
      expect(ctrl).toEqual(controllerBefore);
    });

    it("should set the milestone link", ()=> {
      let milestoneMock = {
        objective: new MockObjective(),
        title: "Milestone title",
        createDate: new Date(),
        dueDate: new Date(),
        endDate: new Date(),
        moreInformation: "more information",
        _links: {
          self: {
            href: "https://localhost:8080/api/milestones/2"
          }
        }
      };
      ctrl.setViewModel(milestoneMock);
      expect((ctrl as any).milestoneLink).toEqual(milestoneMock._links.self.href);
    });

    it("should set the comments link", ()=> {
      let milestoneMock = {
        objective: new MockObjective(),
        title: "Milestone title",
        createDate: new Date(),
        dueDate: new Date(),
        endDate: new Date(),
        moreInformation: "more information",
        _links: {
          comments: {
            href: "https://localhost:8080/api/milestones/2/comments"
          }
        }
      };
      ctrl.setViewModel(milestoneMock);
      expect((ctrl as any).commentsLink).toEqual(milestoneMock._links.comments.href);
    });

  });

  describe("get comments", ()=> {

    it("should get the comments", ()=> {
      //spy getCommentsByMilestone and return a promise
      // check if there are new comments
      //check if commentsLoaded is true
    });
  });

  describe("add comment", ()=> {
    var deferred;

    beforeEach(()=> {
      deferred = $q.defer();
    });

    it("should not add anything if the comment is empty", ()=> {
      spyOn(milestoneService, "createCommentByMilestone");
      ctrl.commentFieldData = "";
      ctrl.addComment();
      expect(milestoneService.createCommentByMilestone).not.toHaveBeenCalled();
    });

    it("should add comment", ()=> {
      spyOn(milestoneService, "createCommentByMilestone").and.returnValue(deferred.promise);
      spyOn(ctrl, "getComments");
      // ctrl.commentFieldData = "this is a comment";
      ctrl.addComment();
      deferred.resolve();
      scope.$digest();
      expect(ctrl.getComments).toHaveBeenCalled();
    });
  });

});
