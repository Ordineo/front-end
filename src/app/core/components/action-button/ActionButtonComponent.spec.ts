import {ORDINEO_CORE} from "../../core.module";
import 'angular-mocks';
import IRootScopeService = angular.IRootScopeService;
import {ActionButtonComponent, ActionButtonController} from "./ActionButtonComponent";
import IScope = angular.IScope;
describe("Action bar component", ()=> {

  var scope:IScope;
  var $componentController;
  var component:ActionButtonController;

  /*mock our module*/
  beforeEach(()=> {
    angular.mock.module(ORDINEO_CORE);
  });

  beforeEach(inject((_$rootScope_:IRootScopeService, _$componentController_)=> {
    scope = _$rootScope_.$new();
    $componentController = _$componentController_;
  }));

  beforeEach(()=> {
    component = $componentController(ActionButtonComponent.NAME, {$scope: scope});
  });

  it('should have a label bound', ()=> {
    // expect(component.label).toBe('test');
  })
});
