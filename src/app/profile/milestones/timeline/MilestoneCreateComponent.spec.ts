import {ORDINEO_PROFILE} from "../../ProfileModule";
import IScope = angular.IScope;
import IRootScopeService = angular.IRootScopeService;
import {
  MilestoneCreateController, MilestoneCreateComponent,
  IMilestoneCreateBindings
} from "./MilestoneCreateComponent";
import IProvideService = angular.auto.IProvideService;
import {MilestoneService, IMilestoneService} from "../../services/MilestoneService";
import createSpy = jasmine.createSpy;
import {Milestone} from "../../../core/models/milestone";
import {Objective} from "../../../core/models/objective";

describe("Milestone Create Controller", ()=> {

  var scope:IScope;
  var $componentController:any;
  var ctrl:MilestoneCreateController;
  var bindings:IMilestoneCreateBindings;
  var milestoneService:IMilestoneService;

  beforeEach(angular.mock.module(ORDINEO_PROFILE,
    ($provide:IProvideService)=> {
      milestoneService = new MockMilestoneService();
      $provide.service(MilestoneService.NAME, ()=> {
        return milestoneService;
      })
    }));

  beforeEach(inject((_$componentController_, _$rootScope_:IRootScopeService)=> {
    scope = _$rootScope_.$new();
    $componentController = _$componentController_;
  }));

  beforeEach(()=> {
    bindings = {
      isSaveEnabled: createSpy('saveSpy'),
      onContentLoaded: createSpy('loadedSpy'),
      username: 'ryan'
    };
    ctrl = $componentController(
      MilestoneCreateComponent.NAME,
      {$scope: scope},
      bindings
    );
  });

  describe('$onInit', function () {
    it('should call onContentLoaded', ()=> {
      ctrl.$onInit();
      expect(ctrl.onContentLoaded).toHaveBeenCalled();
    });
  });

  describe('onObjectives selected', ()=> {
    it('should call setObjective from the timelineservice', ()=> {
      spyOn(milestoneService, 'setObjective');
      ctrl.onObjectiveSelected({
        description: "",
        objectiveType: "",
        tags: [],
        title: ""
      });
      expect(milestoneService.setObjective).toHaveBeenCalled();
    });
  });
});
export class MockMilestoneService implements IMilestoneService {

  put(milestone:Milestone):angular.IPromise<any> {
    return null;
  }

  notifyMilestoneSelected():void {
  }

  subscribeOnMilestoneSelected(scope:angular.IScope, callBack:any):void {
  }

  getMilestoneById(id:string):angular.IPromise<any> {
    return null;
  }

  clearSelected():void {
  }

  setSelectedMilestone(milestone:Milestone):void {
  }

  getSelectedMilestone():Milestone {
    return undefined;
  }

  setObjective(objective:Objective):void {
  }

  getMilestonesByUsername(userName:string):angular.IPromise<any> {
    return null;
  }

  getNewMilestone():Milestone {
    return null;
  }

  searchObjectives(qry:string):angular.IPromise<any> {
    return null;
  }

  createMilestoneByUsername(username:string):angular.IPromise<any> {
    return null;
  }
}
