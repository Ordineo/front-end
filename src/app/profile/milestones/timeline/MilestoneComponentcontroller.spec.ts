/**
 * Created by PhDa on 13/04/2016.
 */
import IControllerService = angular.IControllerService;
import IRootScopeService = angular.IRootScopeService;
import IScope = angular.IScope;
import 'angular-mocks';
import {ORDINEO_CORE} from "../../../core/core.module.ts";
import {MilestoneController} from "./MilestoneComponent";
import IProvideService = angular.auto.IProvideService;
import {ProfileService, IProfileService} from "../../services/ProfileService";
import {MockProfileService} from "../../../../../test/mock/MockProfileService";
import Router = angular.Router;
import {MockRootRouter} from "../../../../../test/mock/MockRootRouter";

var mockdata = require('../../services/mocktimelinedata.json');
describe("card header controller", ()=> {

  var mockProfileService:IProfileService;
  var rootRouter:Router;

  beforeEach(angular.mock.module(ORDINEO_CORE, ($provide:IProvideService)=> {
    mockProfileService = new MockProfileService();
    rootRouter = new MockRootRouter();
    $provide.service(ProfileService.NAME, ()=>mockProfileService);
    $provide.service('$rootRouter', ()=>rootRouter)
  }));

  var $controller:IControllerService;
  var scope:IScope;
  var $rootScope:IRootScopeService;
  var ctrl:MilestoneController;

  beforeEach(inject((_$controller_:IControllerService, _$rootScope_:IRootScopeService, _$rootRouter_:Router)=> {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
  }));

  beforeEach(()=> {
    var bindings = {
      onSaveClick: ()=> {
      },
      onCancelClick: ()=> {
      },
      onEditClick: ()=> {
      }
    };
    ctrl = $controller(MilestoneController, {$scope: scope}, bindings);
  });

  describe("on init", ()=> {
    it("milestonebadge should be set to the upper case first char", ()=> {
      ctrl.milestone = mockdata[0];
      expect(ctrl.mileStoneBadge).toBeUndefined();
      ctrl.testSetMilestoneBadge();
      expect(ctrl.mileStoneBadge).toBe('T');
    });
  });

});
