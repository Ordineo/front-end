import ICompileService = angular.ICompileService;
import {CardHeaderController} from "./CardHeaderComponent";
import IAugmentedJQuery = angular.IAugmentedJQuery;
import IRootScopeService = angular.IRootScopeService;
import IHttpBackendService = angular.IHttpBackendService;
import IScope = angular.IScope;
import {ORDINEO_CORE} from "../../core.module";
import 'angular-mocks';
describe("Card header component", ()=> {

  var template:string = `<card-header></profile-about>`;

  var $compile:ICompileService;
  var $rootScope:IRootScopeService;
  var elm:IAugmentedJQuery;
  var scope:any;
  var isolateScope:IScope;
  var ctrl:CardHeaderController;
  var controllerAs:string = '$ctrl';

  beforeEach(angular.mock.module(ORDINEO_CORE));

  beforeEach(inject((_$httpBackend_:IHttpBackendService, _$compile_:ICompileService, _$rootScope_:IRootScopeService)=> {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    _$httpBackend_.whenGET(/.svg$/).respond(200, '');
  }));

  beforeEach(()=> {
    scope = $rootScope.$new();
    elm = $compile(template)(scope);
    isolateScope = elm.isolateScope();
    ctrl = isolateScope[controllerAs];
    isolateScope.$digest();
  });

  describe("when showBtnEdit is true", ()=> {
    it('should show the edit button', ()=> {
      ctrl.showBtnEdit = true;
      isolateScope.$digest();
      expect(elm.find('.btnEdit').length).toBe(1);
    });
  });

  describe("when showBtnEdit is false", ()=> {
    it("should not show the edit button", ()=> {
      ctrl.showBtnEdit = false;
      isolateScope.$digest();
      expect(elm.find('.btnEdit').length).toBe(0);
    });
  });
});
