import {ORDINEO_PROFILE} from '../../ProfileModule';
import IProvideService = angular.auto.IProvideService;
import {IMilestoneService, MilestoneService} from "../../services/MilestoneService";
import {MockMilestoneService} from "../timeline/MilestoneCreateComponent.spec";
import IRootScopeService = angular.IRootScopeService;
import {MilestoneDetailsController, MilestoneDetailsComponent} from "./MilestoneDetailsComponent";
var moment = require('moment');

describe("Milestone details component", ()=> {

  let milestoneService:IMilestoneService;
  let ctrl:MilestoneDetailsController;

  beforeEach(angular.mock.module(ORDINEO_PROFILE, ($provide:IProvideService)=> {
    milestoneService = new MockMilestoneService();
    $provide.service(MilestoneService.NAME, ()=>milestoneService);
  }));

  beforeEach(inject((_$rootScope_:IRootScopeService, _$componentController_:any)=> {
    ctrl = _$componentController_(MilestoneDetailsComponent.NAME, {$scope: _$rootScope_.$new()});
  }));

  describe("when $onInit gets called", ()=> {
    it('should set status to 0', ()=> {
      ctrl.$onInit();
      expect(ctrl.status).toBe(0);
    });

    describe('setStatus', ()=> {
      it('should set -1 if milestone is null or undefined', ()=> {
        ctrl.setStatus(null);
        expect(ctrl.status).toBe(-1);
      });

      it('should set 1 if enddate is set', ()=> {
        var milestone:Milestone = {
          endDate: '2017-05-25'
        };
        ctrl.setStatus(milestone);
        expect(ctrl.status).toBe(1);
      });

      it('should set 0 if duedate is after current moment', ()=> {
        let after:string = moment().add(1, 'days').format('YYYY-MM-DD');
        var milestone:Milestone = {
          dueDate: after,
        };
        ctrl.setStatus(milestone);
        expect(ctrl.status).toBe(0);
      });

      it('should set 2 if duedate is before current moment', ()=> {
        let after:string = moment().subtract(1, 'days').format('YYYY-MM-DD');
        var milestone:Milestone = {
          dueDate: after,
        };
        ctrl.setStatus(milestone);
        expect(ctrl.status).toBe(2);
      });

    });

    it('should subscribe to milestone service', ()=> {
      spyOn(milestoneService, 'subscribeOnMilestoneSelected');
      expect(milestoneService.subscribeOnMilestoneSelected).not.toHaveBeenCalled();
      ctrl.$onInit();
      expect(milestoneService.subscribeOnMilestoneSelected).toHaveBeenCalled();
    });

    it('should setViewModel if milestone is undefined', ()=> {
      spyOn(ctrl, 'setViewModel');
      expect(ctrl.setViewModel).not.toHaveBeenCalled();
      ctrl.$onInit();
      expect(ctrl.setViewModel).not.toHaveBeenCalled();
      spyOn(milestoneService, 'getSelectedMilestone').and.returnValue({
        createDate: new Date(),
        dueDate: new Date(),
        endDate: null,
        moreInformation: 'test',
        objective: null,
        title: 'test'
      });
      ctrl.$onInit();
      expect(ctrl.setViewModel).toHaveBeenCalled();
    });

    it('should not setviewmodel if milestone is null', ()=> {
      spyOn(ctrl, 'setViewModel');
      spyOn(milestoneService, 'getSelectedMilestone').and.returnValue(null);
      expect(ctrl.setViewModel).not.toHaveBeenCalled();
      ctrl.$onInit();
      expect(ctrl.setViewModel).not.toHaveBeenCalled();
    });

    it('setViewModel should set viewmodel and not if paramter is null', ()=> {
      let milestone:Milestone = {
        createDate: new Date(),
        dueDate: new Date(),
        endDate: new Date(),
        moreInformation: 'Hello world',
        objective: {},
        title: 'Hello totl'
      };
      ctrl.setViewModel(milestone);
      expect(ctrl.milestone).toBe(milestone);
      ctrl.setViewModel(null);
      expect(ctrl.milestone).toBe(milestone);
    });
  });
});
