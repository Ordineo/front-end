import ICompileService = angular.ICompileService;
import {CardHeaderController} from "./CardHeaderComponent";
import IAugmentedJQuery = angular.IAugmentedJQuery;
import IRootScopeService = angular.IRootScopeService;
import IHttpBackendService = angular.IHttpBackendService;
import IScope = angular.IScope;
import {JWORKS360_CORE} from "../../core.module";
import 'angular-mocks';
describe("Card header component", ()=> {

  var template:string = `<card-header></profile-about>`;

  var $compile:ICompileService;
  var $rootScope:IRootScopeService;
  var elm:IAugmentedJQuery;
  var scope:IScope;
  var isolateScope:IScope;
  var ctrl:CardHeaderController;
  var controllerAs:string = '$ctrl';

  beforeEach(angular.mock.module(JWORKS360_CORE));

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
    var btnEdit:IAugmentedJQuery;

    beforeEach(()=> {
      ctrl.showBtnEdit = true;
      btnEdit = elm.find('md-button.btnEdit');
    });

    it('should add the edit button to the DOM', ()=> {
      isolateScope.$digest();
      expect(btnEdit.length).toBe(1);
    });

    describe("when the edit btn is clicked", ()=> {
      it('should show the save button', ()=> {
        expect(elm.find('md-button.btnSave').length).toBe(0);
        ctrl.editMode();
        isolateScope.$digest();
        expect(elm.find('md-button.btnSave').length).toBe(1);
      });
      it('should show the cancel button', ()=> {
        expect(elm.find('md-button.btnCancel').length).toBe(0);
        ctrl.editMode();
        isolateScope.$digest();
        expect(elm.find('md-button.btnCancel').length).toBe(1);
      });
    });
  });

  describe("when showBtnEdit is false", ()=> {
    it("should remove the edit button from the DOM", ()=> {
      ctrl.showBtnEdit = false;
      isolateScope.$digest();
      expect(elm.find('md-button.btnEdit').length).toBe(0);
    });
  });

  describe("when showBtnDrag is false", ()=> {
    it("should remove the drag button from the DOM", ()=> {
      ctrl.showBtnDrag = false;
      isolateScope.$digest();
      expect(elm.find('md-button.btnDrag').length).toBe(0);
    });

    describe("AND when showBtnEdit is true", ()=> {
      var btnEdit:IAugmentedJQuery;

      beforeEach(()=> {
        ctrl.showBtnEdit = true;
        btnEdit = elm.find('md-button.btnEdit');
      });

      it('should add the edit button to the DOM', ()=> {
        isolateScope.$digest();
        expect(btnEdit.length).toBe(1);
      });

      describe("when the edit btn is clicked", ()=> {
        it('should show the save button', ()=> {
          expect(elm.find('md-button.btnSave').length).toBe(0);
          ctrl.editMode();
          isolateScope.$digest();
          expect(elm.find('md-button.btnSave').length).toBe(1);
        });
        it('should show the cancel button', ()=> {
          expect(elm.find('md-button.btnCancel').length).toBe(0);
          ctrl.editMode();
          isolateScope.$digest();
          expect(elm.find('md-button.btnCancel').length).toBe(1);
        });
      });
    });
  });

  describe("when showBtnDrag is true", ()=> {
    it("should add the drag button to the DOM", ()=> {
      ctrl.showBtnDrag = true;
      isolateScope.$digest();
      expect(elm.find('md-button.btnDrag').length).toBe(1);
    });
  });
});
