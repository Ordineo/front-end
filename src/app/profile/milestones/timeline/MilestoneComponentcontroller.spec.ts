/**
 * Created by PhDa on 13/04/2016.
 */
import IControllerService = angular.IControllerService;
import IRootScopeService = angular.IRootScopeService;
import IScope = angular.IScope;
import 'angular-mocks';
import {ORDINEO_CORE} from "../../../core/core.module.ts";
import {MilestoneController} from "./MilestoneComponent";

var mockdata = require('../../services/mocktimelinedata.json');
describe("card header controller", ()=> {

  beforeEach(angular.mock.module(ORDINEO_CORE));

  var $controller:IControllerService;
  var scope:IScope;
  var $rootScope:IRootScopeService;
  var ctrl:MilestoneController;

  beforeEach(inject((_$controller_:IControllerService, _$rootScope_:IRootScopeService)=> {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
  }));

  beforeEach(()=> {
    var bindings = {
      onSaveClick: ()=>{},
      onCancelClick:()=>{},
      onEditClick:()=>{}
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
