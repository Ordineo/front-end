import {CardHeaderController} from "./CardHeaderComponent";
import IControllerService = angular.IControllerService;
import IRootScopeService = angular.IRootScopeService;
import IScope = angular.IScope;
import 'angular-mocks';
import {JWORKS360_CORE} from "../../core.module.ts";

describe("card header controller", ()=> {

  beforeEach(angular.mock.module(JWORKS360_CORE));

  var $controller:IControllerService;
  var scope:IScope;
  var $rootScope:IRootScopeService;
  var ctrl:CardHeaderController;

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
    ctrl = $controller(CardHeaderController, {$scope: scope}, bindings);
  });
  
  describe("when save gets called", ()=> {
    it("normalMode should get called", ()=> {
      spyOn(ctrl, 'normalMode');
      ctrl.save();
      expect(ctrl.normalMode).toHaveBeenCalled();
    });
    it("onSaveClick should get called", ()=> {
      spyOn(ctrl, 'onSaveClick');
      ctrl.save();
      expect(ctrl.onSaveClick).toHaveBeenCalled();
    });
  });
  describe("when cancel gets called", ()=> {
    it("normalMode should get called", ()=> {
      spyOn(ctrl, 'normalMode');
      ctrl.cancel();
      expect(ctrl.normalMode).toHaveBeenCalled();
    });
    it("onCancelClick should get called", ()=> {
      spyOn(ctrl, 'onCancelClick');
      ctrl.cancel();
      expect(ctrl.onCancelClick).toHaveBeenCalled();
    });
  });
  describe("when normal mode gets called", ()=> {
    it("it should show btn edit and NOT cancel and save", ()=> {
      ctrl.normalMode();
      expect(ctrl.showBtnEdit).toBe(true);
      expect(ctrl.showBtnCancel).toBe(false);
      expect(ctrl.showBtnSave).toBe(false);
    });
  });
  describe("when edit mode gets called", ()=> {
    it("it should NOT show btn edit and SHOW cancel and save", ()=> {
      ctrl.editMode();
      expect(ctrl.showBtnEdit).toBe(false);
      expect(ctrl.showBtnCancel).toBe(true);
      expect(ctrl.showBtnSave).toBe(true);
    });
    it("should call onEditClick()", ()=> {
      spyOn(ctrl, 'onEditClick');
      ctrl.editMode();
      expect(ctrl.onEditClick).toHaveBeenCalled();
    });
  });

});
